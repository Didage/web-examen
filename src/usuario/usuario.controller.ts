/* eslint-disable prettier/prettier */
import { Body, Controller,  Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto';

@Controller('usuarios')
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