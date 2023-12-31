/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSocialEntity } from '../redsocial/redsocial.entity';
import { RedSocialService } from '../redsocial/redsocial.service';
import { RedSocialController } from '../redsocial/redsocial.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RedSocialEntity])],
    providers: [RedSocialService],
    controllers: [RedSocialController],
})
export class RedSocialModule {}
