import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  AllReactionTagsResponse,
  SingleReactionTagResponse,
} from './reactions.response';
import { CreateReactionTagDto } from './reactions.dto';

@Controller({
  path: '/reactions',
})
export class ReactionsController {
  constructor(private reactionService: ReactionsService) {}

  @Post('/')
  @ApiResponse({})
  async handleCreation(@Body() dto: CreateReactionTagDto) {
    return this.reactionService.createReactionTag(dto);
  }

  @Put('/:name')
  @ApiResponse({})
  async handleUpdate(
    @Param('name') name: string,
    @Body() dto: CreateReactionTagDto,
  ) {
    return this.reactionService.createReactionTag(dto);
  }

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
