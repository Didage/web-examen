/* eslint-disable prettier/prettier */
import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { FotoAlbumService } from './foto-album.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoAlbumController {

  constructor(private readonly fotoAlbumService: FotoAlbumService){}

  @Post(':albumId/fotos/:fotoId')
   async addFotoToAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string){
       return await this.fotoAlbumService.addFotoToAlbum(albumId, fotoId);
   }
}
