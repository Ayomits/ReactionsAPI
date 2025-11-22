import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  AllReactionTagsResponse,
  SingleReactionTagResponse,
} from './reactions.response';

@Controller({
  path: '/reactions',
})
export class ReactionsController {
  constructor(private reactionService: ReactionsService) {}

  @Get('/')
  @ApiResponse({ status: HttpStatus.OK, type: AllReactionTagsResponse })
  async handleAllReactions() {
    return this.reactionService.findAllReactions();
  }

  @Get('/:name')
  @ApiResponse({ status: HttpStatus.OK, type: SingleReactionTagResponse })
  async handleReactionName(@Param('name') name: string) {
    return this.reactionService.findByName(name);
  }
}
