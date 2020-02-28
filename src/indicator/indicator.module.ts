import { Module } from '@nestjs/common';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';
import { indicator } from '../entities/indicator';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([indicator])
  ],
  controllers: [IndicatorController],
  providers: [IndicatorService]
})
export class IndicatorModule {}
