import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMedicoDto) {
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

  update(id: number, dto: UpdateMedicoDto) {
    return this.prisma.medic.update({
      where: { id },
      data: dto,
      include: { specialty: true },
    });
  }

  remove(id: number) {
    return this.prisma.medic.delete({
      where: { id },
    });
  }
}
