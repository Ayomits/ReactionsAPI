import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionTagEntity } from 'src/entities/reaction.entity';
import { JsonApiResponse } from 'src/response/json-api';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(ReactionTagEntity)
    private reactionRepository: Repository<ReactionTagEntity>,
  ) {}

  async findAllReactions() {
    const tags = await this.reactionRepository.find();

    return new JsonApiResponse({
      data: {
        tags: tags.map((t) => ({
          name: t.name,
          url: `/api/v1/reactions/${t.name}`,
        })),
      },
    });
  }

  async findByName(name: string) {
    const reaction = await this.reactionRepository.findOne({
      where: {
        name,
      },
      relations: ['media'],
      select: {
        media: {
          id: true,
          url: true,
          tag: false,
        },
        name: true,
        id: true,
      },
    });

    if (!reaction) {
      throw new NotFoundException(
        new JsonApiResponse({
          data: {
            message: 'Reaction not found',
          },
          attributes: {
            name,
          },
        }).toJSON(),
      );
    }

    return new JsonApiResponse({
      data: {
        ...reaction,
        media: reaction.media.map((m) => ({ ...m, format: m.url.slice(-3) })),
      },
    }).toJSON();
  }
}
