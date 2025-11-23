import { Module } from '@nestjs/common';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from 'src/entities/reaction.entity';
import { MediaModule } from '../media/media.module';
import { TagMediaEntity } from 'src/entities/tag-media.entity';
import { MediaEntity } from 'src/entities/media.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagEntity, TagMediaEntity, MediaEntity]),
    MediaModule,
    AuthModule,
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TypeOrmModule],
})
export class TagModule {}
