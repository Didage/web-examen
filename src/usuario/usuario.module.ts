/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    providers: [],
    controllers: [],
})
export class FotoModule {}
