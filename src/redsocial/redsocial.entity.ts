/* eslint-disable prettier/prettier */
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RedSocialEntity {

  @PrimaryGeneratedColumn('uuid')
  redSocialId: string;

  @Column()
  nombre: string;

  @Column()
  slogan: string;
  
  @OneToMany(() => UsuarioEntity, (usuario) => usuario.redSocial)
  usuarios: UsuarioEntity[];
}
