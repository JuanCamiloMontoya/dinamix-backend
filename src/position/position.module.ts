import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { position } from '../entities/position';

@Module({
  imports: [
    TypeOrmModule.forFeature([position])
  ],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
