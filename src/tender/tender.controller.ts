import { Controller, Body, Post, UseGuards, BadGatewayException, Get, Param, Put } from '@nestjs/common';
import { TenderService } from './tender.service';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto } from './dto/update.dto';

@Controller('tender')
export class TenderController {
    constructor(private readonly tenderTypeService: TenderService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createTender(@Body() body: CreateDto) {
        const response: any = await this.tenderTypeService.createTender(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getTenderId(@Param('id') id: number) {
        return this.tenderTypeService.getTenderId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getTenderAll() {
        return this.tenderTypeService.getTenderAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updateTender(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.tenderTypeService.updateTender(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateTenderState(@Param('id') id: number) {
        const response: any = await this.tenderTypeService.updateTenderState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}
