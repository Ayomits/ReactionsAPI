import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TokenEntity } from 'src/entities/token.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.register({}),
  ],
  providers: [TokensService],
  exports: [TokensService, TypeOrmModule, JwtModule],
})
export class TokensModule {}
