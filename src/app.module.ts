import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './app/v1/tags/tags.module';
import { MediaModule } from './app/v1/media/media.module';
import { MinioModule } from './minio/minio.module';
import { UserModule } from './app/v1/user/user.module';
import { AuthModule } from './app/v1/auth/auth.module';
import { TokensModule } from './app/v1/tokens/tokens.module';
import dataSource from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    TagModule,
    MediaModule,
    MinioModule,
    UserModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
