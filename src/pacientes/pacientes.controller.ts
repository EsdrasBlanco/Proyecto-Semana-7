import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PacientesService } from './pacientes.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@ApiTags('Pacientes')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo paciente' })
  create(@Body() dto: CreatePacienteDto) {
    return this.pacientesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pacientes' })
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de un paciente' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paciente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.remove(id);
  }
}
