import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  private parseBirthDate(birthDate: string): Date {
    const date = new Date(birthDate);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Fecha de nacimiento inválida');
    }
    if (date > new Date()) {
      throw new BadRequestException(
        'La fecha de nacimiento no puede estar en el futuro',
      );
    }
    return date;
  }

  create(dto: CreatePacienteDto) {
    const birthDate = this.parseBirthDate(dto.birthDate);

    return this.prisma.patient.create({
      data: {
        name: dto.name,
        email: dto.email,
        birthDate,
        phone: dto.phone,
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { appointments: true },
    });
    if (!patient) {
      throw new NotFoundException(`Paciente con id ${id} no encontrado`);
    }
    return patient;
  }

  update(id: number, dto: UpdatePacienteDto) {
    const { birthDate, ...rest } = dto;
    const data = {
      ...rest,
      ...(birthDate !== undefined && {
        birthDate: this.parseBirthDate(birthDate),
      }),
    };

    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
