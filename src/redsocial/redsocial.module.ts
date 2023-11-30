/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './redsocial.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RedSocialEntity])],
    providers: [],
    controllers: [],
})
export class FotoModule {}
