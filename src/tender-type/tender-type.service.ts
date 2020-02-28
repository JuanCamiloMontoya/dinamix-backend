import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { tender_type } from '../entities/tender_type';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class TenderTypeService {

    constructor(
        @InjectRepository(tender_type) private readonly tenderTypeRepository: Repository<tender_type>
    ) { }

    async createTenderType(body: CreateDto) {
        try {
            const res = await this.tenderTypeRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getTenderTypeAll() {
        return await this.tenderTypeRepository.find()
    }

    async getTenderTypeId(tenderTypeId: number) {
        return await this.tenderTypeRepository.findOne(tenderTypeId)
    }

    async updateTenderType(tenderTypeId: number, body: UpdateDto) {
        try {
            const res = await this.tenderTypeRepository.update(tenderTypeId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateTenderTypeState(tenderTypeId: number) {
        try {
            const current = await this.tenderTypeRepository.findOne(tenderTypeId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided tenderType' };

            const res = await this.tenderTypeRepository.update(
                tenderTypeId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
