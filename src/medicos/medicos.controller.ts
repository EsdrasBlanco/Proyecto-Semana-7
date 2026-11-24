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
import { MedicosService } from './medicos.service.js';
import { CreateMedicosDto } from './dto/create-medicos.dto.js';
import { UpdateMedicosDto } from './dto/update-medicos.dto.js';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() createMedicosDto: CreateMedicosDto) {
    return this.medicosService.create(createMedicosDto);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicosDto: UpdateMedicosDto,
  ) {
    return this.medicosService.update(id, updateMedicosDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicosService.remove(id);
  }
}