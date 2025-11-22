import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty()
  name: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}

export class UploadMediaDto {
  @ApiProperty({ type: [String], format: 'binary' })
  media: Express.Multer.File[];
}
