import { Controller, BadGatewayException, Param, UseGuards, Put, Get, Post, Body } from '@nestjs/common';
import { TenderTypeService } from './tender-type.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('tender-type')
export class TenderTypeController {
    constructor(private readonly tenderTypeService: TenderTypeService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createTenderType(@Body() body: CreateDto) {
        const response: any = await this.tenderTypeService.createTenderType(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getTenderTypeId(@Param('id') id: number) {
        return this.tenderTypeService.getTenderTypeId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getTenderTypeAll() {
        return this.tenderTypeService.getTenderTypeAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updateTenderType(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.tenderTypeService.updateTenderType(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateTenderTypeState(@Param('id') id: number) {
        const response: any = await this.tenderTypeService.updateTenderTypeState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}
