import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import {
  AllReactionTagsResponse,
  SingleReactionTagResponse,
} from './reactions.response';
import { CreateReactionTagDto, UploadMediaDto } from './reactions.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JsonApiResponse } from 'src/response/json-api';

@Controller({
  path: '/reactions',
})
export class ReactionsController {
  constructor(private reactionService: ReactionsService) {}

  @Post('/:name/upload')
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      limits: { fileSize: 1024 * 1024 * 4 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadMediaDto })
  uploadReactionMedia(@UploadedFiles() files: Express.Multer.File[]) {
    return this.reactionService.uploadMedia(files);
  }

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
