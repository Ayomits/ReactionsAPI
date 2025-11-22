import { ApiProperty } from '@nestjs/swagger';

class Tag {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

class Tags {
  @ApiProperty({ type: [Tag] })
  tags: Tag[];
}

export class AllTagTagsResponse {
  @ApiProperty({ type: Tags })
  data: Tags;
}

class SingleTagMedia {
  @ApiProperty()
  id: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  format: string;
  @ApiProperty()
  source: number;
}

class SingleTag {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [SingleTagMedia] })
  media: SingleTagMedia[];
}

export class SingleTagResponse {
  @ApiProperty({ type: SingleTag })
  data: SingleTag;
}
