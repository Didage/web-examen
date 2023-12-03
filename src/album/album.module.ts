/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity';
import { AlbumService } from '../album/album.service';
import { AlbumController } from './album.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity])],
    providers: [AlbumService],
    controllers: [AlbumController],
})
export class AlbumModule {}
