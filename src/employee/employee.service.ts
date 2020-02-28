import { Injectable } from '@nestjs/common';
import { employee } from '../entities/employee';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class EmployeeService {

    constructor(
        @InjectRepository(employee) private readonly employeeRepository: Repository<employee>
    ) { }

    async createEmployee(body: CreateDto) {
        try {
            const res = await this.employeeRepository.save({ ...body })
            return (res.id) ? { success: 'OK', detail: res.id } : { error: 'TRANSACTION_ERROR' }
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async getEmployeeAll() {
        return await this.employeeRepository.find()
    }

    async getEmployeeId(employeeId: number) {
        return await this.employeeRepository.findOne(employeeId)
    }

    async updateEmployee(employeeId: number, body: UpdateDto) {
        try {
            const res = await this.employeeRepository.update(employeeId, body);
            return res.raw.changedRows == 0 ? { error: 'NO_EXISTS' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }

    async updateEmployeeState(employeeId: number) {
        try {
            const current = await this.employeeRepository.findOne(employeeId, { select: ["state"] })

            if (!current) return { error: 'TRANSACTION_ERROR', detail: 'Invalided employee' };

            const res = await this.employeeRepository.update(
                employeeId,
                { state: (current.state == 'active') ? 'inactive' : 'active' }
            );
            return res.raw.changedRows == 0 ? { error: 'NO_UPDATE' } : { success: 'OK' };
        } catch (error) {
            return { error: 'TRANSACTION_ERROR', detail: error }
        }
    }
}
