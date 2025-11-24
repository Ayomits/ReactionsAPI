import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { TokensModule } from '../tokens/tokens.module';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => TokensModule)],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard, TokensModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
