/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    providers: [UsuarioService],
    controllers: [],
})
export class FotoModule {}
