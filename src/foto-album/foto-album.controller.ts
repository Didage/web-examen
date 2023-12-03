/* eslint-disable prettier/prettier */
import { Controller, Param, Post } from '@nestjs/common';
import { FotoAlbumService } from './foto-album.service';

@Controller('albums')
export class FotoAlbumController {

  constructor(private readonly fotoAlbumService: FotoAlbumService){}

  @Post(':albumId/fotos/:fotoId')
   async addFotoToAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string){
       return await this.fotoAlbumService.addFotoToAlbum(albumId, fotoId);
   }
}
