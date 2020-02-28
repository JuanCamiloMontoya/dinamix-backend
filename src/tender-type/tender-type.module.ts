import { Module } from '@nestjs/common';
import { TenderTypeService } from './tender-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tender_type } from '../entities/tender_type';
import { TenderTypeController } from './tender-type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([tender_type])
  ],
  controllers: [TenderTypeController],
  providers: [TenderTypeService]
})
export class TenderTypeModule { }
