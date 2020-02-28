import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tender } from '../entities/tender';
import { Repository } from 'typeorm';

@Injectable()
export class TenderService {

    constructor(
        @InjectRepository(tender) private readonly tenderRepository: Repository<tender>
    ) { }

    async createTender(body: CreateDto) {
        try {
            const res = await this.tenderRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getTenderAll() {
        return await this.tenderRepository.find()
    }

    async getTenderId(tenderId: number) {
        return await this.tenderRepository.findOne(tenderId)
    }

    async updateTender(tenderId: number, body: UpdateDto) {
        try {
            const res = await this.tenderRepository.update(tenderId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateTenderState(tenderId: number) {
        try {
            const current = await this.tenderRepository.findOne(tenderId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided tender' };

            const res = await this.tenderRepository.update(
                tenderId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
