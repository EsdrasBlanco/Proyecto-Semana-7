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
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @IsInt({ message: 'El id de la especialidad debe ser un número entero' })
  @IsPositive({ message: 'El id de la especialidad debe ser positivo' })
  specialtyId: number;

  @IsOptional()
  @IsInt({ message: 'El id del usuario debe ser un número entero' })
  @IsPositive({ message: 'El id del usuario debe ser positivo' })
  userId?: number;
}
