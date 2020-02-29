import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstanceConfigService } from './common/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { EmployeeModule } from './employee/employee.module';
import { EntityModule } from './entity/entity.module';
import { IndicatorModule } from './indicator/indicator.module';
import { PositionModule } from './position/position.module';
import { ProductModule } from './product/product.module';
import { TenderModule } from './tender/tender.module';
import { TenderTypeModule } from './tender-type/tender-type.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FormalEducationModule } from './formal-education/formal-education.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(InstanceConfigService.orm_config),
    CommonModule,
    EmployeeModule,
    EntityModule,
    IndicatorModule,
    PositionModule,
    ProductModule,
    TenderModule,
    TenderTypeModule,
    AuthModule,
    UserModule,
    FormalEducationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
