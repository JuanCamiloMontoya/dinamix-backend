import { Module } from '@nestjs/common';
import { FormalEducationController } from './formal-education.controller';
import { FormalEducationService } from './formal-education.service';
import { formal_education } from '../entities/formal_education';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([formal_education])
  ],
  controllers: [FormalEducationController],
  providers: [FormalEducationService]
})
export class FormalEducationModule { }
