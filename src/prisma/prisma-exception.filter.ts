import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    let httpException: HttpException;

    switch (exception.code) {
      case 'P2002':
        httpException = new ConflictException(
          'Ya existe un registro con ese valor único',
        );
        break;
      case 'P2025':
        httpException = new NotFoundException('Registro no encontrado');
        break;
      case 'P2003':
        httpException = new BadRequestException(
          'Referencia inválida o registro con relaciones asociadas',
        );
        break;
      default:
        return exception;
    }

    response
      .status(httpException.getStatus())
      .json(httpException.getResponse());
  }
}
