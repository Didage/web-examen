/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { FotoEntity } from './foto/foto.entity';
import { AlbumEntity } from './album/album.entity';
import { RedSocialEntity } from './redsocial/redsocial.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { AlbumModule } from './album/album.module';
import { RedSocialModule } from './redsocial/redsocial.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FotoAlbumModule } from './foto-album/foto-album.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'exam_db',
    entities: [FotoEntity, AlbumEntity, RedSocialEntity, UsuarioEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }), FotoModule, AlbumModule, RedSocialModule, UsuarioModule, FotoAlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
