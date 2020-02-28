import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { position } from '../entities/position';

@Injectable()
export class PositionService {

    constructor(
        @InjectRepository(position) private readonly positionRepository: Repository<position>
    ) { }

    async createPosition(body: CreateDto) {
        try {
            const res = await this.positionRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getPositionAll() {
        return await this.positionRepository.find()
    }

    async getPositionId(positionId: number) {
        return await this.positionRepository.findOne(positionId)
    }

    async updatePosition(positionId: number, body: UpdateDto) {
        try {
            const res = await this.positionRepository.update(positionId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updatePositionState(positionId: number) {
        try {
            const current = await this.positionRepository.findOne(positionId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided position' };

            const res = await this.positionRepository.update(
                positionId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
