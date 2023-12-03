import { Module } from '@nestjs/common';
import { FotoAlbumService } from '../foto-album/foto-album.service';
import { FotoAlbumController } from './foto-album.controller';

@Module({
  providers: [FotoAlbumService],
  controllers: [FotoAlbumController],
})
export class FotoAlbumModule {}
