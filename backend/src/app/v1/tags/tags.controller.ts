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

import {
  CreateTagDto,
  UpdateTagDto,
  UploadMediaImagesDto,
  UploadMediaLinksDto,
} from './tags.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TagService } from './tags.service';
import { AllTagTagsResponse, SingleTagResponse } from './tags.response';
import { AuthGuard } from 'src/guards/auth.guard';
import { RequireRole, RolesGuard } from 'src/guards/role.guard';
import { RoleNames } from '../roles/roles.const';

@Controller({
  path: '/tags',
})
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/:name/upload/images')
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      limits: { fileSize: 1024 * 1024 * 4 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadMediaImagesDto })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @RequireRole(RoleNames.Super)
  uploadTagMediaImages(
    @Param('name') name: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.tagService.uploadMediaImages(name, files);
  }

  @Post('/:name/upload/links')
  @ApiBody({ type: UploadMediaLinksDto })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @RequireRole(RoleNames.Super)
  uploadTagMediaLinks(
    @Param('name') name: string,
    @Body() dto: UploadMediaLinksDto,
  ) {
    return this.tagService.uploadMediaLinks(name, dto);
  }

  @Post('/')
  @ApiResponse({})
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @RequireRole(RoleNames.Super)
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
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @RequireRole(RoleNames.Super)
  handleUpdate(@Param('name') name: string, @Body() dto: UpdateTagDto) {
    return this.tagService.updateTag(name, dto);
  }

  @Delete('/:name')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @RequireRole(RoleNames.Super)
  async handleTagDeletion(@Param('name') name: string) {
    return this.tagService.deleteTag(name);
  }
}
