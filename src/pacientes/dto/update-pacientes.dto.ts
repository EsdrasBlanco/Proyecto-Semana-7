import { PartialType } from '@nestjs/mapped-types';
import { CreatePacientesDto } from './create-pacientes.dto.js';

export class UpdatePacientesDto extends PartialType(CreatePacientesDto) {}
