import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from 'src/entities/media.entity';
import { MinioBuckets } from 'src/minio/minio.const';
import { MinioService } from 'src/minio/minio.service';
import { In, Not, Repository } from 'typeorm';

@Injectable()
export class MediaService implements OnModuleInit {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    private minioService: MinioService,
  ) {}

  async onModuleInit() {
    await this.minioService.createBucketIfNotExists(MinioBuckets.tags);
    await this.minioService.createBucketIfNotExists(MinioBuckets.avatars);
  }

  async upload(options: {
    bucketName: string;
    folderName: string | null;
    files: Array<Express.Multer.File>;
  }) {
    const saves = options.files.map(() => ({
      is_uploaded: false,
      bucketName: options.bucketName,
    }));
    const medias = await this.mediaRepository.save(saves);
    const ids = medias.map((m) => m.id);

    const resolvedIds: string[] = [];
    function generatePath(id: string) {
      return `${options.folderName ?? ''}/${id}.gif`;
    }

    for (let i = 0; i < medias.length; i++) {
      const id = ids[i];
      try {
        await this.minioService.client.putObject(
          options.bucketName,
          generatePath(id),
          options.files[i].buffer,
          options.files[i].size,
          {
            'Content-Type': options.files[i].mimetype,
            'Original-Name': options.files[i].originalname,
          },
        );
        resolvedIds.push(id);
      } catch {
        continue;
      }
    }

    await this.mediaRepository.update(
      { id: In(resolvedIds) },
      {
        is_uploaded: true,
        bucketName: options.bucketName,
        path: () => `CONCAT('${options.folderName ?? ''}/', id, '.gif')`,
      },
    );

    if (resolvedIds.length != options.files.length) {
      await this.mediaRepository.delete({ id: Not(In(resolvedIds)) });
    }

    return this.mediaRepository.find({
      where: { id: In(resolvedIds) },
    });
  }

  async delete(ids: string[]) {
    const entries = await this.mediaRepository.find({
      where: { id: In(ids) },
    });

    for (const entry of entries) {
      try {
        await this.minioService.client.removeObject(
          entry.bucketName,
          entry.path,
          { forceDelete: true },
        );
      } catch {
        continue;
      }
    }

    await this.mediaRepository.delete({ id: In(ids) });
  }
}
