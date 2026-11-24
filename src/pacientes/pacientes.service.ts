import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePacientesDto } from './dto/create-pacientes.dto.js';
import { UpdatePacientesDto } from './dto/update-pacientes.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaService) {}

  private parseBirthDate(value: string | Date): Date {
    const date = value instanceof Date ? value : new Date(value);
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

  async create(dto: CreatePacientesDto) {
    const existingEmail = await this.prisma.patient.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) {
      throw new ConflictException('El correo ya está registrado');
    }

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

  async update(id: number, dto: UpdatePacientesDto) {
    await this.findOne(id);

    if (dto.email) {
      const existingEmail = await this.prisma.patient.findUnique({
        where: { email: dto.email },
      });
      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

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

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
