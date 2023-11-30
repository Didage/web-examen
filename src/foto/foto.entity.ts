/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FotoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  iso: number;

  @Column()
  velObturacion: number;

  @Column()
  apertura: number;

  @Column()
  fecha: string;
}
