import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getUsersMe(@Req() request: any) {
    return this.userService.findUsersMe(request);
  }
}
