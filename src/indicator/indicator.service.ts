import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { indicator } from '../entities/indicator';

@Injectable()
export class IndicatorService {

    constructor(
        @InjectRepository(indicator) private readonly indicatorRepository: Repository<indicator>
    ) { }

    async createIndicator(body: CreateDto) {
        try {
            const res = await this.indicatorRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getIndicatorAll() {
        return await this.indicatorRepository.find()
    }

    async getIndicatorId(indicatorId: number) {
        return await this.indicatorRepository.findOne(indicatorId)
    }

    async updateIndicator(indicatorId: number, body: UpdateDto) {
        try {
            const res = await this.indicatorRepository.update(indicatorId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateIndicatorState(indicatorId: number) {
        try {
            const current = await this.indicatorRepository.findOne(indicatorId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided indicator' };

            const res = await this.indicatorRepository.update(
                indicatorId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
