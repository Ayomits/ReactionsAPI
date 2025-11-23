import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AppConfig } from 'src/config';
import { AuthController } from './auth.controller';
import { TokensModule } from '../tokens/tokens.module';

AppConfig.init();

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => TokensModule)],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
