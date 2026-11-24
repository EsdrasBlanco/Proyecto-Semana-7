import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicosDto } from './dto/create-medicos.dto.js';
import { UpdateMedicosDto } from './dto/update-medicos.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMedicosDto) {
    const specialty = await this.prisma.specialty.findUnique({
      where: { id: dto.specialtyId },
    });
    if (!specialty) {
      throw new NotFoundException('La especialidad indicada no existe');
    }

    const existingEmail = await this.prisma.medic.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) {
      throw new ConflictException('El correo ya está registrado');
    }

    if (dto.userId !== undefined) {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!user) {
        throw new NotFoundException('El usuario indicado no existe');
      }
    }

    return this.prisma.medic.create({
      data: dto,
      include: { specialty: true },
    });
  }

  findAll() {
    return this.prisma.medic.findMany({
      orderBy: { id: 'asc' },
      include: { specialty: true },
    });
  }

  async findOne(id: number) {
    const medic = await this.prisma.medic.findUnique({
      where: { id },
      include: { specialty: true },
    });
    if (!medic) {
      throw new NotFoundException(`Médico con id ${id} no encontrado`);
    }
    return medic;
  }

  async update(id: number, dto: UpdateMedicosDto) {
    await this.findOne(id);

    if (dto.specialtyId !== undefined) {
      const specialty = await this.prisma.specialty.findUnique({
        where: { id: dto.specialtyId },
      });
      if (!specialty) {
        throw new NotFoundException('La especialidad indicada no existe');
      }
    }

    if (dto.email) {
      const existingEmail = await this.prisma.medic.findUnique({
        where: { email: dto.email },
      });
      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    if (dto.userId !== undefined) {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!user) {
        throw new NotFoundException('El usuario indicado no existe');
      }
    }

    return this.prisma.medic.update({
      where: { id },
      data: dto,
      include: { specialty: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.medic.delete({
      where: { id },
    });
  }
}