import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config';
import { AuthController } from './auth.controller';

AppConfig.init();

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: AppConfig.jwtSecretAccess,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
