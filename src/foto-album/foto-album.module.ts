import { Module } from '@nestjs/common';
import { FotoAlbumService } from '../foto-album/foto-album.service';
import { FotoAlbumController } from './foto-album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumEntity } from '../album/album.entity';


@Module({
  imports: [TypeOrmModule.forFeature([FotoEntity, AlbumEntity])],
  providers: [FotoAlbumService],
  controllers: [FotoAlbumController],
})
export class FotoAlbumModule {}
