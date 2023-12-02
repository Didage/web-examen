/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../foto/foto.entity';
import { FotoService } from '../foto/foto.service';
import { AlbumEntity } from '../album/album.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FotoEntity, AlbumEntity])],
    providers: [FotoService],
    controllers: [],
})
export class FotoModule {}
