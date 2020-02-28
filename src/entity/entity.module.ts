import { Module } from '@nestjs/common';
import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entity } from '../entities/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([entity])
  ],
  controllers: [EntityController],
  providers: [EntityService]
})
export class EntityModule {}
