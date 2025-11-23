import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';
import { RolesGuard } from 'src/guards/role.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    RolesModule,
  ],
  providers: [UserService, RolesGuard],
  exports: [TypeOrmModule, UserService, RolesGuard],
  controllers: [UserController],
})
export class UserModule {}
