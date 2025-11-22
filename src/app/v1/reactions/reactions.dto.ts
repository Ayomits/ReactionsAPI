import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateReactionTagDto {
  @ApiProperty()
  name: string;
}

export class UpdateReactionDto extends PartialType(CreateReactionTagDto) {}

export class UploadMediaDto {
  @ApiProperty({ type: [String], format: 'binary' })
  media: Express.Multer.File[];
}
