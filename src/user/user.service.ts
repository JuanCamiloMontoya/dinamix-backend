import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

import { user } from '../entities/user';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(user) private readonly userRepository: Repository<user>
    ) { }

    async updateUser(id: number, user: UpdateDto) {
        try {
            let res = await this.userRepository.update(id, user);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }

    async createUser(user: CreateDto) {
        try {
            const res = await this.userRepository.save({...user, email: user.email.toLowerCase()});
            return res.id == 0 ? { error: 'TRANSACTION_ERROR' } : { success: 'OK', detail: res.id };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error };
        }
    }

    async getUserAll() {
        return await this.userRepository.find({ order: { name: "ASC" } })
    }

    async getActiveUsers() {
        return await this.userRepository.find({ where: { state: "active" }, order: { name: "ASC" } })
    }

    async updateUserState(userId: number, state: string) {
        try {
            if (!state) {
                const current = await this.userRepository.findOne(userId, { select: ["state"] })
                if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided order' }
                state = (current.state == 'active') ? 'inactive' : 'active'
            }

            const res = await this.userRepository.update(userId, { state });

            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
    //TEST
}
