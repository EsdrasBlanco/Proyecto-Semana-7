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
import { PacientesService } from './pacientes.service.js';
import { CreatePacientesDto } from './dto/create-pacientes.dto.js';
import { UpdatePacientesDto } from './dto/update-pacientes.dto.js';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacientesDto: CreatePacientesDto) {
    return this.pacientesService.create(createPacientesDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePacientesDto: UpdatePacientesDto,
  ) {
    return this.pacientesService.update(id, updatePacientesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pacientesService.remove(id);
  }
}
