import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { user } from '../entities/user';
import { HttpStrategy } from '../common/strategys/http.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([user]),
    JwtModule.register({
      secret: 'abcd',
      signOptions: { expiresIn: '365d' },
    }),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy]
})
export class AuthModule { }
