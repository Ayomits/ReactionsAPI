import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonApiResponse } from 'src/response/json-api';
import { Repository } from 'typeorm';
import { CreateTagDto, UpdateTagDto } from './tags.dto';
import { HttpMethod } from 'src/utils/method';
import { MediaService } from '../media/media.service';
import { BadRequestException } from 'src/exceptions/bad-request';
import { NotFoundException } from 'src/exceptions/not-found';
import { TagEntity } from 'src/entities/reaction.entity';
import { TagMediaEntity } from 'src/entities/reaction-media.entity';
import { MinioService } from 'src/minio/minio.service';
import { MinioBuckets } from 'src/minio/minio.const';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(TagMediaEntity)
    private tagMediaRepository: Repository<TagMediaEntity>,
    private mediaService: MediaService,
    private minioService: MinioService,
  ) {}

  async uploadMedia(name: string, files: Express.Multer.File[]) {
    const existed = await this.tagRepository.findOneBy({ name: name });

    if (!existed) {
      throw new NotFoundException('Tag does not exists');
    }

    const gifs = files.filter((f) => f.mimetype === 'image/gif');

    if (gifs.length === 0) {
      throw new BadRequestException('None gifs provided');
    }

    const medias = await this.mediaService.upload({
      bucketName: 'tags',
      folderName: name,
      files: gifs,
    });

    const uploaded = await this.tagMediaRepository.save(
      medias.map((m) => ({
        tag: existed,
        url: this.minioService.buildMinioUrl(
          MinioBuckets.tags,
          `/${name}/${m.id}.gif`,
        ),
        media: m,
      })),
    );

    return new JsonApiResponse({
      data: {
        medias: uploaded,
      },
      relationships: {
        tag: {
          links: [`/api/v1/tags/${name}`],
          data: existed,
        },
      },
    }).toJSON();
  }

  async createTag(dto: CreateTagDto) {
    const existed = await this.tagRepository.exists({
      where: { name: dto.name },
    });

    if (existed) {
      return new BadRequestException('Tag already exists');
    }

    const tag = await this.tagRepository.save(dto);

    return new JsonApiResponse({
      data: tag,
      actions: [
        {
          method: HttpMethod.Get,
          path: `/api/v1/tags/${tag.name}`,
        },
        {
          method: HttpMethod.Put,
          path: `/api/v1/tags/${tag.name}`,
        },
        {
          method: HttpMethod.Post,
          path: `/api/v1/tags/${tag.name}/upload`,
        },
      ],
    }).toJSON();
  }

  async updateTag(name: string, dto: UpdateTagDto) {
    const [existed, newExisted] = await Promise.all([
      this.tagRepository.exists({
        where: { name: name },
      }),
      this.tagRepository.exists({ where: { name: dto.name } }),
    ]);

    if (existed) {
      return new NotFoundException();
    }

    if (newExisted) {
      return new BadRequestException('New name already exists');
    }

    const tag = await this.tagRepository.update({ name: name }, dto);

    return new JsonApiResponse({
      data: tag,
      actions: [
        {
          method: HttpMethod.Get,
          path: `/api/v1/tags/${dto.name}`,
        },
        {
          method: HttpMethod.Put,
          path: `/api/v1/tags/${dto.name}`,
        },
        {
          method: HttpMethod.Post,
          path: `/api/v1/tags/${dto.name}/upload`,
        },
      ],
    }).toJSON();
  }

  async findAllTags() {
    const tags = await this.tagRepository.find();

    return new JsonApiResponse({
      data: tags.map((t) => ({
        name: t.name,
        url: `/api/v1/tags/${t.name}`,
      })),
    });
  }

  async findByName(name: string) {
    const Tag = await this.tagRepository.findOne({
      where: {
        name,
      },
      relations: ['media'],
      select: {
        media: {
          id: true,
          url: true,
          tag: false,
          media: true,
        },
        name: true,
        id: true,
      },
    });

    if (!Tag) {
      throw new NotFoundException('Tag not found');
    }

    return new JsonApiResponse({
      data: {
        ...Tag,
        media: Tag.media.map((m) => ({
          ...m,
          format: m.url.slice(-3),
        })),
      },
    }).toJSON();
  }

  async deleteTag(name: string) {
    const existed = await this.tagRepository.findOne({
      where: { name },
      relations: { media: { media: true } },
    });

    if (!existed) {
      throw new NotFoundException('tag does not exists');
    }

    return new JsonApiResponse({ data: existed });
  }
}
