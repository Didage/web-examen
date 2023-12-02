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
        const foto: FotoEntity = await this.FotoRepository.findOne({where: {fotoId: FotoId}});
        if (!foto)
          throw new BusinessLogicException("La foto especificada no existe.", BusinessError.NOT_FOUND);
      
        const album: AlbumEntity = await this.AlbumRepository.findOne({where: {albumId: AlbumId}, relations: ["fotos"]})
        if (!album)
          throw new BusinessLogicException("El album especificado no existe.", BusinessError.NOT_FOUND);
        if(foto.fecha<album.fechaInicio||foto.fecha>album.fechaFin)
          throw new BusinessLogicException("La fecha de la foto no es compatible con las fechas del album.", BusinessError.NOT_FOUND); 
        album.fotos.push(foto);
        foto.album = album;
        return await this.AlbumRepository.save(album);
      }
}
