/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { AlbumService } from '../album/album.service';
import { AlbumDto } from '../album/album.dto';
import { AlbumEntity } from '../album/album.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
constructor(private readonly albumService: AlbumService) {}

  @Get(':albumId')
  async findOne(@Param('albumId') albumId: string) {
    return await this.albumService.findOne(albumId);
  }

  @Post()
  async create(@Body() albumDto: AlbumDto) {
    const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
    return await this.albumService.create(album);
  }

  @Delete(':albumId')
  @HttpCode(204)
  async delete(@Param('albumId') albumId: string) {
    return await this.albumService.delete(albumId);
  }
}
