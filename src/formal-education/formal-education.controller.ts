import { Controller, Post, UseGuards, Body, BadGatewayException, Param, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { FormalEducationService } from './formal-education.service';

@Controller('formal-education')
export class FormalEducationController {

    constructor(private readonly formalEducationService: FormalEducationService) { }

    @Post()
    //@UseGuards(AuthGuard('bearer'))
    async createFormalEducation(@Body() body: CreateDto) {
        const response: any = await this.formalEducationService.createFormalEducation(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    //@UseGuards(AuthGuard('bearer'))
    async getFormalEducationId(@Param('id') id: number) {
        return this.formalEducationService.getFormalEducationId(id);
    }

    @Get()
    //@UseGuards(AuthGuard('bearer'))
    async getFormalEducationAll() {
        return this.formalEducationService.getFormalEducationAll();
    }

    @Put(':id')
    //@UseGuards(AuthGuard('bearer'))
    async updateFormalEducation(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.formalEducationService.updateFormalEducation(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    //UseGuards(AuthGuard('bearer'))
    async updateFormalEducationState(@Param('id') id: number) {
        const response: any = await this.formalEducationService.updateFormalEducationState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}
