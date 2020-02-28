import { Controller, Post, UseGuards, Body, BadGatewayException, Param, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { PositionService } from './position.service';

@Controller('position')
export class PositionController {

    constructor(private readonly positionService: PositionService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createPosition(@Body() body: CreateDto) {
        const response: any = await this.positionService.createPosition(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getPositionId(@Param('id') id: number) {
        return this.positionService.getPositionId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getPositionAll() {
        return this.positionService.getPositionAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updatePosition(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.positionService.updatePosition(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updatePositionState(@Param('id') id: number) {
        const response: any = await this.positionService.updatePositionState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}
