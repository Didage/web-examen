/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './Foto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly FotoRepository: Repository<FotoEntity>,
        @InjectRepository(AlbumEntity)
        private readonly AlbumRepository: Repository<AlbumEntity>,
      ) {}
    
      async create(foto: FotoEntity): Promise<FotoEntity> {
        if (foto.iso <= 10 && foto.iso >= 6400)
          throw new BusinessLogicException(
            'ISO no válido.',
            BusinessError.NOT_FOUND,
          );
        if (!(foto.velObturacion >= 2 && foto.velObturacion <= 250))
          throw new BusinessLogicException(
            'Vel. de obturación no válida.',
            BusinessError.NOT_FOUND,
        );
        if (!(foto.apertura >= 1 && foto.apertura <= 32))
          throw new BusinessLogicException(
            'Apertura no válida.',
            BusinessError.NOT_FOUND,
          );
        if (!(
          foto.iso > (6400-10)/2 && foto.velObturacion > (250-2)/2 ||
          foto.iso > (6400-10)/2 && foto.apertura > (32-1)/2 ||
          foto.velObturacion > (250-2)/2 && foto.apertura > (32-1)/2
        )) {
        throw new BusinessLogicException(
          'Valores de exposición no válidos.',
          BusinessError.NOT_FOUND,
          );
        }
      return await this.FotoRepository.save(foto);
    }

      async findAll(): Promise<FotoEntity[]> {
        return await this.FotoRepository.find({
          relations: ['usuario', 'album'],
        });
      }
    
      async findOne(fotoId: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.FotoRepository.findOne({
          where: { fotoId }, relations: ["album"]
        });
        if (!foto)
          throw new BusinessLogicException(
            'La foto no fue encontrada.',
            BusinessError.NOT_FOUND,
          );
        return foto;
      }

      async delete(fotoId: string) {
        const foto: FotoEntity = await this.FotoRepository.findOne({
          where: { fotoId }, relations: ["album"]
        });
        
        if (!foto) {
          throw new BusinessLogicException(
            'La foto no fue encontrada.',
            BusinessError.NOT_FOUND,
          ); 
        } else if (foto.album){
          if(foto.album.fotos.values.length==1) {
            const albumId = foto.album.albumId;
            const album: AlbumEntity = await this.AlbumRepository.findOne({
              where: { albumId }, relations: ["fotos"]
            });
            await this.FotoRepository.remove(foto);
            await this.AlbumRepository.remove(album)
          };
      }
        await this.FotoRepository.remove(foto);
        
      }

}
