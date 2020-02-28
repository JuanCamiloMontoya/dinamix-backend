import { Controller, BadGatewayException, Post, Body, Put, Param, Get, UseGuards, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() body: CreateDto) {
        const response: any = await this.userService.createUser(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.userService.updateUser(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getTraderAll() {
        return this.userService.getUserAll();
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateUserState(@Param('id') id: number, @Query() query: { state: string }) {
        const response: any = await this.userService.updateUserState(id, query.state);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}
