/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString } from 'class-validator';
import { FotoDto } from '../foto/foto.dto';

export class AlbumDto {
    
  @IsString()
  @IsNotEmpty()
  albumId: string;

  @IsNotEmpty()
  fechaInicio: Date;

  @IsNotEmpty()
  fechaFin: Date;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  
  fotos: FotoDto[];

}
