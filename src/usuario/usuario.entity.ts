/* eslint-disable prettier/prettier */
import { FotoEntity } from '../foto/foto.entity';
import { RedSocialEntity } from '../redsocial/redsocial.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {

  @PrimaryGeneratedColumn('uuid')
  usuarioId: string;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @ManyToOne(() => RedSocialEntity, redSocial => redSocial.usuarios)
  @JoinColumn({ name: 'redSocialId' })
  redSocial: RedSocialEntity;

  @OneToMany(() => FotoEntity, (foto) => foto.usuario)
  fotos: FotoEntity[];
}
