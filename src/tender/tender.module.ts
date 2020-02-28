import { Module } from '@nestjs/common';
import { TenderController } from './tender.controller';
import { TenderService } from './tender.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tender } from '../entities/tender';

@Module({
  imports: [
    TypeOrmModule.forFeature([tender])
  ],
  controllers: [TenderController],
  providers: [TenderService]
})
export class TenderModule {}
