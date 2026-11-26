import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Clínica Salud Integral')
    .setDescription(
      'Documentación interactiva de los módulos de Pacientes y Médicos (NestJS + Prisma)',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`\nSERVIDOR CORRIENDO EN: http://localhost:${port}`);
  console.log(`SWAGGER UI DISPONIBLE EN: http://localhost:${port}/api-docs`);
  console.log(
    `PRISMA STUDIO: ejecuta "pnpm prisma:studio" (http://localhost:5555)\n`,
  );
}
await bootstrap();
