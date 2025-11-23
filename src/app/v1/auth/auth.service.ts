import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { NotFoundException } from 'src/exceptions/not-found';
import { BadRequestException } from 'src/exceptions/bad-request';
import { JsonApiResponse } from 'src/response/json-api';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const existed = await this.userService.findUserByEmail(dto.email);

    if (!existed) {
      throw new NotFoundException('user does not exists');
    }

    const isPasswordValid = await this.userService.validatePassword(
      dto.password,
      existed.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return new JsonApiResponse({
      data: {
        tokens: {
          access: await this.jwtService.signAsync(existed, {
            secret: AppConfig.jwtSecretAccess,
          }),
          refresh: await this.jwtService.signAsync(existed, {
            secret: AppConfig.jwtSecretRefresh,
          }),
        },
        user: existed,
      },
    });
  }

  async register(dto: AuthDto) {
    const existed = await this.userService.findUserByEmail(dto.email);

    if (existed) {
      throw new NotFoundException('user aldready exists');
    }

    const user = await this.userService.createUser(dto);

    return new JsonApiResponse({
      data: {
        tokens: {
          access: await this.jwtService.signAsync(user, {
            secret: AppConfig.jwtSecretAccess,
          }),
          refresh: await this.jwtService.signAsync(user, {
            secret: AppConfig.jwtSecretRefresh,
          }),
        },
        user: user,
      },
    });
  }
}
