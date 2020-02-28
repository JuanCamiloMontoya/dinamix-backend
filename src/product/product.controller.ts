import { Controller, Post, UseGuards, Body, BadGatewayException, Param, Get, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('product')
export class ProductController {
    
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseGuards(AuthGuard('bearer'))
    async createProduct(@Body() body: CreateDto) {
        const response: any = await this.productService.createProduct(body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Get(':id')
    @UseGuards(AuthGuard('bearer'))
    async getProductId(@Param('id') id: number) {
        return this.productService.getProductId(id);
    }

    @Get()
    @UseGuards(AuthGuard('bearer'))
    async getProductAll() {
        return this.productService.getProductAll();
    }

    @Put(':id')
    @UseGuards(AuthGuard('bearer'))
    async updateProduct(@Param('id') id: number, @Body() body: UpdateDto) {
        const response: any = await this.productService.updateProduct(id, body);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }

    @Put('change-state/:id')
    @UseGuards(AuthGuard('bearer'))
    async updateProductState(@Param('id') id: number) {
        const response: any = await this.productService.updateProductState(id);
        if (response.success)
            return response;
        throw new BadGatewayException(response)
    }
}