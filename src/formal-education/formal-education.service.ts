import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { formal_education } from '../entities/formal_education';

@Injectable()
export class FormalEducationService {

    constructor(
        @InjectRepository(formal_education) private readonly formalEducationRepository: Repository<formal_education>
    ) { }

    async createFormalEducation(body: CreateDto) {
        try {
            const res = await this.formalEducationRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getFormalEducationAll() {
        return await this.formalEducationRepository.find()
    }

    async getFormalEducationId(formalEducationId: number) {
        return await this.formalEducationRepository.findOne(formalEducationId)
    }

    async updateFormalEducation(formalEducationId: number, body: UpdateDto) {
        try {
            const res = await this.formalEducationRepository.update(formalEducationId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateFormalEducationState(formalEducationId: number) {
        try {
            const current = await this.formalEducationRepository.findOne(formalEducationId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided formalEducation' };

            const res = await this.formalEducationRepository.update(
                formalEducationId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
