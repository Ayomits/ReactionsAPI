import { ApiProperty } from '@nestjs/swagger';

class ReactionTag {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

class ReactionTags {
  @ApiProperty({ type: [ReactionTag] })
  tags: ReactionTag[];
}

export class AllReactionTagsResponse {
  @ApiProperty({ type: ReactionTags })
  data: ReactionTags;
}

class SingleReactionTagMedia {
  @ApiProperty()
  id: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  format: string;
}

class SingleReactionTag {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [SingleReactionTagMedia] })
  media: SingleReactionTagMedia[];
}

export class SingleReactionTagResponse {
  @ApiProperty({ type: SingleReactionTag })
  data: SingleReactionTag;
}
