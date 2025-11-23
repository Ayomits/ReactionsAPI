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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateTagDto, UpdateTagDto, UploadMediaDto } from './tags.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TagService } from './tags.service';
import { AllTagTagsResponse, SingleTagResponse } from './tags.response';
import { AuthGuard } from 'src/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  uploadTagMedia(
    @Param('name') name: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.tagService.uploadMedia(name, files);
  }

  @Post('/')
  @ApiResponse({})
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  handleCreation(@Body() dto: CreateTagDto) {
    return this.tagService.createTag(dto);
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

  @Put('/:name')
  @ApiResponse({})
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  handleUpdate(@Param('name') name: string, @Body() dto: UpdateTagDto) {
    return this.tagService.updateTag(name, dto);
  }

  @Delete('/:name')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async handleTagDeletion(@Param('name') name: string) {
    return this.tagService.deleteTag(name);
  }
}
