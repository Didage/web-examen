/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RedSocialEntity } from './redSocial.entity';
import { RedSocialService } from './redSocial.service';
import { RedSocialDto } from './redSocial.dto';

@Controller('redSocials')
export class RedSocialController {
  constructor(private readonly redSocialService: RedSocialService) {}
  @Post()
  async create(@Body() redSocialDto: RedSocialDto) {
    const redSocial: RedSocialEntity = plainToInstance(RedSocialEntity, redSocialDto);
    return await this.redSocialService.create(redSocial);
  }
}
