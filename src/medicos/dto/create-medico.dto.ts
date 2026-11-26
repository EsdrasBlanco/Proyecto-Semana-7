import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMedicoDto {
  @ApiProperty({ example: 'Dra. Laura Méndez', description: 'Nombre completo del médico' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({ example: 'laura.mendez@saludintegral.mx', description: 'Correo electrónico único' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({ example: 1, description: 'ID de la especialidad médica' })
  @IsInt({ message: 'El id de la especialidad debe ser un número entero' })
  @IsPositive({ message: 'El id de la especialidad debe ser positivo' })
  specialtyId: number;

  @ApiPropertyOptional({ example: 3, description: 'ID de usuario vinculado (opcional)' })
  @IsOptional()
  @IsInt({ message: 'El id del usuario debe ser un número entero' })
  @IsPositive({ message: 'El id del usuario debe ser positivo' })
  userId?: number;
}
