/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
import { UsuarioDto } from '../usuario/usuario.dto';

export class RedSocialDto {
    
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  slogan: string;
  
  usuarios: UsuarioDto[];

}
