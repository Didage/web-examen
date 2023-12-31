/* eslint-disable prettier/prettier */
import { Body, Controller,  Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('usuarios')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @Get(':usuarioId')
  async findOne(@Param('usuarioId') usuarioId: string) {
    return await this.usuarioService.findOne(usuarioId);
  }

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) {
    const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDto);
    return await this.usuarioService.create(usuario);
  }
}