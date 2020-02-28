import { Controller, Post, UseGuards, Body, BadGatewayException, Param, Get, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('employee')
export class EmployeeController {
    
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createEmployee(@Body() body: CreateDto) {
        const response: any = await this.employeeService.createEmployee(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getEmployeeId(@Param('id') id: number) {
        return this.employeeService.getEmployeeId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getEmployeeAll() {
        return this.employeeService.getEmployeeAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updateEmployee(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.employeeService.updateEmployee(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateEmployeeState(@Param('id') id: number) {
        const response: any = await this.employeeService.updateEmployeeState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}