import { Controller, UnauthorizedException, Body, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }


    @Post('login')
    async login(@Body() body: AuthDto) {
        const response = await this.authService.login(body);
        if (response)
            return { payload: this.jwtService.sign({ ...response }) }

        throw new UnauthorizedException({ error: "USER_NOT_EXIST", detail: "El usuario no existe" });
    }
}
