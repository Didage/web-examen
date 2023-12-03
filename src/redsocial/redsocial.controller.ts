/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RedSocialEntity } from '../redsocial/redsocial.entity';
import { RedSocialService } from '../redsocial/redsocial.service';
import { RedSocialDto } from '../redsocial/redsocial.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('redes')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedSocialController {
  constructor(private readonly redSocialService: RedSocialService) {}
  @Post()
  async create(@Body() redSocialDto: RedSocialDto) {
    const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
    return await this.redSocialService.create(redSocial);
  }
}
