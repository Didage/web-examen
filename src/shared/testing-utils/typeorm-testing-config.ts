/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from '../../foto/foto.entity';
import { AlbumEntity } from '../../album/album.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { RedSocialEntity } from '../../redsocial/redsocial.entity';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [FotoEntity, AlbumEntity, UsuarioEntity, RedSocialEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([FotoEntity, AlbumEntity, UsuarioEntity, RedSocialEntity]),
];