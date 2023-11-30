/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FotoEntity } from '../Foto/Foto.entity';
import { AlbumEntity } from '../Album/Album.entity';
import { Repository } from 'typeorm';
import { BusinessError,BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class FotoAlbumService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly FotoRepository: Repository<FotoEntity>,
    
        @InjectRepository(AlbumEntity)
        private readonly AlbumRepository: Repository<AlbumEntity>
    ) {}

    async addFotoToAlbum(AlbumId: string, FotoId: string): Promise<AlbumEntity> {
        const Foto: FotoEntity = await this.FotoRepository.findOne({where: {fotoId: FotoId}});
        if (!Foto)
          throw new BusinessLogicException("La foto especificada no existe.", BusinessError.NOT_FOUND);
      
        const Album: AlbumEntity = await this.AlbumRepository.findOne({where: {albumId: AlbumId}, relations: ["Fotos"]})
        if (!Album)
          throw new BusinessLogicException("El album especificado no existe.", BusinessError.NOT_FOUND);
    
        Album.fotos.push(Foto);
        return await this.AlbumRepository.save(Album);
      }
    
}