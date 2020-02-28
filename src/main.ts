import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 const configService = app.get("ConfigService").envConfig;
 
 app.setGlobalPrefix(configService.APP_URL_PREFIX);
 app.useGlobalPipes(new ValidationPipe());
 //Eliminar en producción
 app.enableCors();
 
 await app.listen(process.env.PORT || "4200", "0.0.0.0");
 console.log(`Server running on ${configService.APP_HOST_SERVER}:${process.env.PORT || '4200'}/${configService.APP_URL_PREFIX}`);
}
bootstrap();
