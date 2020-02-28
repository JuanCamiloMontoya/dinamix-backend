import { Injectable } from '@nestjs/common';
import { product } from '../entities/product';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(product) private readonly productRepository: Repository<product>
    ) { }

    async createProduct(body: CreateDto) {
        try {
            const res = await this.productRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getProductAll() {
        return await this.productRepository.find()
    }

    async getProductId(productId: number) {
        return await this.productRepository.findOne(productId)
    }

    async updateProduct(productId: number, body: UpdateDto) {
        try {
            const res = await this.productRepository.update(productId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateProductState(productId: number) {
        try {
            const current = await this.productRepository.findOne(productId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided product' };

            const res = await this.productRepository.update(
                productId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
