import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReactionsModule } from './app/v1/reactions/reactions.module';
import { MediaModule } from './app/v1/media/media.module';
import dataSource from './data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options), ReactionsModule, MediaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
