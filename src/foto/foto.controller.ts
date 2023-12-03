/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';
import { FotoDto } from './foto.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('fotos')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

  @Get()
  async findAll() {
    return await this.fotoService.findAll();
  }

  @Get(':fotoId')
  async findOne(@Param('fotoId') fotoId: string) {
    return await this.fotoService.findOne(fotoId);
  }

  @Post()
  async create(@Body() fotoDto: FotoDto) {
    const foto: FotoEntity = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.create(foto);
  }

  @Delete(':fotoId')
  @HttpCode(204)
  async delete(@Param('fotoId') fotoId: string) {
    return await this.fotoService.delete(fotoId);
  }
}