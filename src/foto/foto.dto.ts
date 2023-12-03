/* eslint-disable prettier/prettier */
import {IsDate, IsNotEmpty, IsNumber} from 'class-validator';
import { AlbumDto } from '../album/album.dto';
import { UsuarioDto } from '../usuario/usuario.dto';

export class FotoDto {
  
    @IsNumber()
    @IsNotEmpty()
    iso: number;
  
    @IsNumber()
    @IsNotEmpty()
    velObturacion: number;
  
    @IsNumber()
    @IsNotEmpty()
    apertura: number;
  
    @IsNotEmpty()
    @IsDate()
    fecha: Date;
  
    usuario: UsuarioDto;
  
    album: AlbumDto;

}
