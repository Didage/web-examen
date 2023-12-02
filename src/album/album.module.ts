/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { AlbumService } from '../album/album.service';

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity])],
    providers: [AlbumService],
    controllers: [],
})
export class FotoModule {}
