import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfig } from 'src/config';
import { TokenEntity, TokenType } from 'src/entities/token.entity';
import { Time } from 'src/utils/time';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

type TokenPayload = {
  rid: string;
  aid: string;
  uid: string;
};

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async verifyAccess(token: string) {
    const payload = this.jwtService.decode<TokenPayload>(token);

    if (!payload) {
      return false;
    }

    const dToken = await this.tokenRepository.findOneBy({ id: payload.aid });

    if (!dToken) {
      return false;
    }

    const validate = await this.jwtService
      .verifyAsync(token, {
        secret: AppConfig.jwtSecretAccess,
      })
      .then(() => true)
      .catch(() => false);

    if (!validate) {
      return false;
    }

    return true;
  }

  async verifyRefresh(token: string) {
    const payload = this.jwtService.decode<TokenPayload>(token);

    if (!payload) {
      return false;
    }

    const dToken = await this.tokenRepository.findOneBy({ id: payload.rid });

    if (!dToken) {
      return false;
    }

    const validate = await this.jwtService
      .verifyAsync(token, {
        secret: AppConfig.jwtSecretRefresh,
      })
      .then(() => true)
      .catch(() => false);

    if (!validate) {
      return false;
    }

    return true;
  }

  async signPair(userId: string) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      return;
    }

    await this.revokePair(user.id);

    const [access, refresh] = await Promise.all([
      this.tokenRepository.save({
        type: TokenType.Access,
        user,
      }),
      this.tokenRepository.save({
        type: TokenType.Refresh,
        user,
      }),
    ]);

    const payload: TokenPayload = {
      aid: access.id,
      rid: refresh.id,
      uid: userId,
    };

    return {
      access: await this.signAccess(payload),
      refresh: await this.signRefresh(payload),
    };
  }

  async revokePair(userId: string) {
    return await this.tokenRepository.delete({ user: { id: userId } });
  }

  private async signAccess(payload: TokenPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: AppConfig.jwtSecretAccess,
      expiresIn: Math.floor(Time.week / 1000),
    });
  }

  private async signRefresh(payload: TokenPayload) {
    return await this.jwtService.signAsync(payload, {
      secret: AppConfig.jwtSecretRefresh,
      expiresIn: Math.floor(Time.week / 1000),
    });
  }
}
