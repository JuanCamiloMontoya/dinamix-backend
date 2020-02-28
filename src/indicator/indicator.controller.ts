import { Controller, Post, UseGuards, Body, BadGatewayException, Param, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { IndicatorService } from './indicator.service';

@Controller('indicator')
export class IndicatorController {

    constructor(private readonly indicatorService: IndicatorService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createIndicator(@Body() body: CreateDto) {
        const response: any = await this.indicatorService.createIndicator(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getIndicatorId(@Param('id') id: number) {
        return this.indicatorService.getIndicatorId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getIndicatorAll() {
        return this.indicatorService.getIndicatorAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updateIndicator(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.indicatorService.updateIndicator(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateIndicatorState(@Param('id') id: number) {
        const response: any = await this.indicatorService.updateIndicatorState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}
