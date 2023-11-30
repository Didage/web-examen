/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './Foto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class FotoService {

    constructor(
        @InjectRepository(FotoEntity)
        private readonly FotoRepository: Repository<FotoEntity>,
      ) {}
    
      async create(Foto: FotoEntity): Promise<FotoEntity> {
        if (Foto.iso >= 10 && Foto.iso <= 6400)
          throw new BusinessLogicException(
            'ISO no válido.',
            BusinessError.NOT_FOUND,
          );
          if (Foto.velObturacion >= 2 && Foto.iso <= 250)
          throw new BusinessLogicException(
            'Vel. de obturación no válida.',
            BusinessError.NOT_FOUND,
          );
          if (Foto.apertura >= 1 && Foto.iso <= 32)
          throw new BusinessLogicException(
            'Apertura no válida.',
            BusinessError.NOT_FOUND,
          );
          if (
            Foto.iso > (6400-10)/2 && Foto.velObturacion > (250-2)/2 ||
            Foto.iso > (6400-10)/2 && Foto.apertura > (32-1)/2 ||
            Foto.velObturacion > (250-2)/2 && Foto.apertura > (32-1)/2
          ) {
          throw new BusinessLogicException(
            'Valores de exposición no válidos.',
            BusinessError.NOT_FOUND,
            );
          }
        return await this.FotoRepository.save(Foto);
      }

      async findAll(): Promise<FotoEntity[]> {
        return await this.FotoRepository.find({
          relations: ['usuario', 'foto'],
        });
      }
    
      async findOne(fotoId: string): Promise<FotoEntity> {
        const Foto: FotoEntity = await this.FotoRepository.findOne({
          where: { fotoId },
        });
        if (!Foto)
          throw new BusinessLogicException(
            'La foto no fue encontrada.',
            BusinessError.NOT_FOUND,
          );
        return Foto;
      }

      async delete(fotoId: string) {
        const Foto: FotoEntity = await this.FotoRepository.findOne({
          where: { fotoId },
        });
        if (!Foto)
          throw new BusinessLogicException(
            'La foto no fue encontrada.',
            BusinessError.NOT_FOUND,
          );
        await this.FotoRepository.remove(Foto);
      }

}
