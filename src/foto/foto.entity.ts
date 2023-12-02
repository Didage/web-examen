/* eslint-disable prettier/prettier */
import { AlbumEntity } from '../album/album.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {

  @PrimaryGeneratedColumn('uuid')
  fotoId: string;

  @Column()
  iso: number;

  @Column()
  velObturacion: number;

  @Column()
  apertura: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.fotos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioEntity;

  @ManyToOne(() => AlbumEntity, album => album.fotos)
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;
  
}
