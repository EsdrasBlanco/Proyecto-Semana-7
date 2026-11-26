import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del paciente' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({ example: 'juan.perez@mail.com', description: 'Correo electrónico único' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({ example: '1990-05-14', description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe ser una fecha válida' },
  )
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthDate: string;

  @ApiPropertyOptional({ example: '5551234567', description: 'Teléfono de contacto opcional' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El teléfono debe ser un texto' })
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  phone?: string;
}
