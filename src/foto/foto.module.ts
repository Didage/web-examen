/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoEntity } from './foto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FotoEntity])],
    providers: [],
    controllers: [],
})
export class FotoModule {}
