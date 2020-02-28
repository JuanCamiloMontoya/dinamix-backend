import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { UserService } from './user.service';
import { user } from '../entities/user'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([user])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
