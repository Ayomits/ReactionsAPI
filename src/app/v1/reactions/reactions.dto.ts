import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateReactionTagDto {
  @ApiProperty()
  name: string;
}

export class UpdateReactionDto extends PartialType(CreateReactionTagDto) {}
