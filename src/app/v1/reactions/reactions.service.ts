import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionTagEntity } from 'src/entities/reaction.entity';
import { JsonApiResponse } from 'src/response/json-api';
import { Repository } from 'typeorm';
import { CreateReactionTagDto, UpdateReactionDto } from './reactions.dto';
import { HttpMethod } from 'src/utils/method';
import { MediaService } from '../media/media.service';
import { BadRequestException } from 'src/exceptions/bad-request';
import { NotFoundException } from 'src/exceptions/not-found';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(ReactionTagEntity)
    private reactionRepository: Repository<ReactionTagEntity>,
    private mediaService: MediaService,
  ) {}

  async uploadMedia(name: string, files: Express.Multer.File[]) {
    const existed = await this.reactionRepository.findBy({ name: name });

    if (!existed) {
      throw new NotFoundException('Tag does not exists');
    }

    const gifs = files.filter((f) => f.mimetype === 'image/gif');

    if (gifs.length === 0) {
      throw new BadRequestException('None gifs provided');
    }

    const ids = await this.mediaService.upload({
      bucketName: 'reactions',
      folderName: name,
      files: gifs,
    });

    return new JsonApiResponse({
      data: {
        message: 'OK',
      },
    }).toJSON();
  }

  async createReactionTag(dto: CreateReactionTagDto) {
    const existed = await this.reactionRepository.exists({
      where: { name: dto.name },
    });

    if (existed) {
      return new BadRequestException('Tag already exists');
    }

    const reaction = await this.reactionRepository.save(dto);

    return new JsonApiResponse({
      data: reaction,
      actions: [
        {
          method: HttpMethod.Get,
          path: `/api/v1/reactions/${reaction.name}`,
        },
        {
          method: HttpMethod.Put,
          path: `/api/v1/reactions/${reaction.name}`,
        },
      ],
    }).toJSON();
  }

  async updateReactionTag(name: string, dto: UpdateReactionDto) {
    const [existed, newExisted] = await Promise.all([
      this.reactionRepository.exists({
        where: { name: name },
      }),
      this.reactionRepository.exists({ where: { name: dto.name } }),
    ]);

    if (existed) {
      return new NotFoundException();
    }

    if (newExisted) {
      return new BadRequestException('New name already exists');
    }

    const reaction = await this.reactionRepository.update({ name: name }, dto);

    return new JsonApiResponse({
      data: reaction,
      actions: [
        {
          method: HttpMethod.Get,
          path: `/api/v1/reactions/${dto.name}`,
        },
        {
          method: HttpMethod.Put,
          path: `/api/v1/reactions/${dto.name}`,
        },
      ],
    }).toJSON();
  }

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
          type: true,
        },
        name: true,
        id: true,
      },
    });

    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    return new JsonApiResponse({
      data: {
        ...reaction,
        media: reaction.media.map((m) => ({
          ...m,
          source: m.type,
          format: m.url.slice(-3),
        })),
      },
    }).toJSON();
  }
}
