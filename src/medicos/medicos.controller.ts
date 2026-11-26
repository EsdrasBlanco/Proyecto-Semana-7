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
import { MedicosService } from './medicos.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@ApiTags('Médicos')
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo médico' })
  create(@Body() dto: CreateMedicoDto) {
    return this.medicosService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los médicos' })
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un médico por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de un médico' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMedicoDto,
  ) {
    return this.medicosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un médico' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.remove(id);
  }
}
