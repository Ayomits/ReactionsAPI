import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

import { CreateTagDto, UpdateTagDto, UploadMediaDto } from './tags.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TagService } from './tags.service';
import { AllTagTagsResponse, SingleTagResponse } from './tags.response';

@Controller({
  path: '/tags',
})
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/:name/upload')
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      limits: { fileSize: 1024 * 1024 * 4 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadMediaDto })
  uploadTagMedia(
    @Param('name') name: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.tagService.uploadMedia(name, files);
  }

  @Post('/')
  @ApiResponse({})
  handleCreation(@Body() dto: CreateTagDto) {
    return this.tagService.createTag(dto);
  }

  @Put('/:name')
  @ApiResponse({})
  handleUpdate(@Param('name') name: string, @Body() dto: UpdateTagDto) {
    return this.tagService.updateTag(name, dto);
  }

  @Get('/')
  @ApiResponse({ status: HttpStatus.OK, type: AllTagTagsResponse })
  handleAllTags() {
    return this.tagService.findAllTags();
  }

  @Get('/:name')
  @ApiResponse({ status: HttpStatus.OK, type: SingleTagResponse })
  async handleTagName(@Param('name') name: string) {
    return this.tagService.findByName(name);
  }

  @Delete('/:name')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async handleTagDeletion(@Param('name') name: string) {
    return this.tagService.deleteTag(name);
  }
}
