import { Module } from '@nestjs/common';
import { FotoAlbumService } from './foto-album.service';

@Module({
  providers: [FotoAlbumService]
})
export class FotoAlbumModule {}
