import { Module } from '@nestjs/common';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/entities/reaction.entity';
import { MediaModule } from '../media/media.module';
import { TagMediaEntity } from 'src/entities/reaction-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TagMediaEntity]), MediaModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TypeOrmModule],
})
export class TagModule {}
