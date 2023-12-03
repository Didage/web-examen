/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
import { FotoDto } from '../foto/foto.dto';
import { RedSocialDto } from '../redsocial/redsocial.dto';

export class UsuarioDto {
    
  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  redSocial: RedSocialDto;

  fotos: FotoDto[];

}
