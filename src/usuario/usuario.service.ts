/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './Usuario.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly UsuarioRepository: Repository<UsuarioEntity>,
      ) {}
    
      async create(Usuario: UsuarioEntity): Promise<UsuarioEntity> {
        if (Usuario.telefono.length != 10)
          throw new BusinessLogicException(
            'El teléfono debe tener 10 números.',
            BusinessError.NOT_FOUND,
          );
        return await this.UsuarioRepository.save(Usuario);
      }

      async findAll(): Promise<UsuarioEntity[]> {
        return await this.UsuarioRepository.find({
          relations: ['redSocial', 'fotos'],
        });
      }
    
      async findOne(usuarioId: string): Promise<UsuarioEntity> {
        const Usuario: UsuarioEntity = await this.UsuarioRepository.findOne({
          where: { usuarioId },
        });
        if (!Usuario)
          throw new BusinessLogicException(
            'El usuario no fue encontrado.',
            BusinessError.NOT_FOUND,
          );
        return Usuario;
      }

}
