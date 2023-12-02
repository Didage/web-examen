/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './Album.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {

    constructor(
        @InjectRepository(AlbumEntity)
        private readonly AlbumRepository: Repository<AlbumEntity>,
      ) {}
    
      async create(Album: AlbumEntity): Promise<AlbumEntity> {
        if (!Album.titulo)
          throw new BusinessLogicException(
            'El título no puede ser vacío.',
            BusinessError.NOT_FOUND,
          );
        return await this.AlbumRepository.save(Album);
      }
    
      async findOne(albumId: string): Promise<AlbumEntity> {
        const Album: AlbumEntity = await this.AlbumRepository.findOne({
          where: { albumId },
        });
        if (!Album)
          throw new BusinessLogicException(
            'El album no fue encontrado.',
            BusinessError.NOT_FOUND,
          );
        return Album;
      }

      async delete(albumId: string) {
        const Album: AlbumEntity = await this.AlbumRepository.findOne({
          where: { albumId }, relations: ["fotos"]
        });
        if (!Album) {
          throw new BusinessLogicException(
            'El album no fue encontrado.',
            BusinessError.NOT_FOUND,
          );
        }
        else if (Album.fotos.values.length>0){
          throw new BusinessLogicException(
            'Un album con fotos no se puede borrar.',
            BusinessError.NOT_FOUND,
          );
        }
        await this.AlbumRepository.remove(Album);
      }
}

