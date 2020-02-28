import { Injectable } from '@nestjs/common';
import { entity } from '../entities/entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class EntityService {

    constructor(
        @InjectRepository(entity) private readonly entityRepository: Repository<entity>
    ) { }

    async createEntity(body: CreateDto) {
        try {
            const res = await this.entityRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getEntityAll() {
        return await this.entityRepository.find()
    }

    async getEntityId(entityId: number) {
        return await this.entityRepository.findOne(entityId)
    }

    async updateEntity(entityId: number, body: UpdateDto) {
        try {
            const res = await this.entityRepository.update(entityId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateEntityState(entityId: number) {
        try {
            const current = await this.entityRepository.findOne(entityId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided entity' };

            const res = await this.entityRepository.update(
                entityId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
