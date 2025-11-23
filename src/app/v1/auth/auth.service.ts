import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { NotFoundException } from 'src/exceptions/not-found';
import { BadRequestException } from 'src/exceptions/bad-request';
import { JsonApiResponse } from 'src/response/json-api';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => TokensService))
    private tokensService: TokensService,
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

    const tokens = await this.tokensService.signPair(existed.id);

    return new JsonApiResponse({
      data: {
        tokens: tokens,
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

    const tokens = await this.tokensService.signPair(user.id);

    return new JsonApiResponse({
      data: {
        tokens: tokens,
        user: user,
      },
    });
  }
}
