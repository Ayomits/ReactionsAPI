import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionTagEntity } from 'src/entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReactionTagEntity])],
  controllers: [ReactionsController],
  providers: [ReactionsService],
  exports: [TypeOrmModule],
})
export class ReactionsModule {}
