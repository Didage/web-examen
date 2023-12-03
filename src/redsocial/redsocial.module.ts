/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from '../redsocial/redsocial.entity';
import { RedSocialService } from '../redsocial/redsocial.service';
import { RedsocialController } from './redsocial.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RedSocialEntity])],
    providers: [RedSocialService],
    controllers: [RedsocialController],
})
export class FotoModule {}
