import { Controller, Post, UseGuards, Body, BadGatewayException, Param, Get, Put } from '@nestjs/common';
import { EntityService } from './entity.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('entity')
export class EntityController {
    
    constructor(private readonly entityService: EntityService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createEntity(@Body() body: CreateDto) {
        const response: any = await this.entityService.createEntity(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getEntityId(@Param('id') id: number) {
        return this.entityService.getEntityId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getEntityAll() {
        return this.entityService.getEntityAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updateEntity(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.entityService.updateEntity(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateEntityState(@Param('id') id: number) {
        const response: any = await this.entityService.updateEntityState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}