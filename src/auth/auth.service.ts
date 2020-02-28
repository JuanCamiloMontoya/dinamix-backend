import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { user } from '../entities/user';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>,
        private readonly jwtService: JwtService
    ) { }

    async login(body: AuthDto) {
        
        const { sha256 } = require('crypto-hash');
        return await this.userRepository
            .createQueryBuilder("user")
            .select(['user.id', 'user.name', 'user.email'])
            .where("user.email = :email and user.password = :password", { email: body.email.toLowerCase(), password: await sha256(body.password) })
            .getOne();
    }

    async validateUser(userToken: string): Promise<any> {
        let payload: any = this.jwtService.decode(userToken);
        if (payload) {
            let response = await this.userRepository.findOne({ select: ['id', 'email', 'name'], where: { ...payload, token: userToken } })
            if (response)
                return response;

            return false;
        }
        return false;
    }
}
