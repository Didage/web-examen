/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './RedSocial.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RedSocialService {

    constructor(
        @InjectRepository(RedSocialEntity)
        private readonly RedSocialRepository: Repository<RedSocialEntity>,
      ) {}
    
      async create(RedSocial: RedSocialEntity): Promise<RedSocialEntity> {
        if (!RedSocial.slogan||RedSocial.slogan.length < 20)
          throw new BusinessLogicException(
            'El slogan no puede ser vacío y debe tener al menos 20 caractéres.',
            BusinessError.NOT_FOUND,
          );
        return await this.RedSocialRepository.save(RedSocial);
      }
}
