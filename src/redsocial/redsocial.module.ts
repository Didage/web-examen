/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from './redsocial.entity';
import { RedSocialService } from './redsocial.service';

@Module({
    imports: [TypeOrmModule.forFeature([RedSocialEntity])],
    providers: [RedSocialService],
    controllers: [],
})
export class FotoModule {}
