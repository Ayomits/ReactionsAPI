import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from 'src/entities/media.entity';
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
    await this.minioService.createBucketIfNotExists('reactions');
  }

  async upload(options: {
    bucketName: string;
    folderName: string | null;
    files: Array<Express.Multer.File>;
  }) {
    const saves = options.files.map(() => ({ is_uploaded: false }));
    const ids = (await this.mediaRepository.save(saves)).map((i) => i.id);

    const resolvedIds: string[] = [];
    for (let i = 0; i < ids.length; i++) {
      const objectName = `${options.folderName ?? ''}/${ids[i]}.gif`;
      try {
        await this.minioService.client.putObject(
          options.bucketName,
          objectName,
          options.files[i].buffer, 
          options.files[i].size, 
          {
            'Content-Type': options.files[i].mimetype,
            'Original-Name': options.files[i].originalname,
          },
        );
        resolvedIds.push(ids[i]);
      } catch {
        continue;
      }
    }

    await this.mediaRepository.update(
      { id: In(resolvedIds) },
      { is_uploaded: true },
    );

    if (resolvedIds.length != options.files.length) {
      await this.mediaRepository.delete({ id: Not(In(resolvedIds)) });
    }

    return resolvedIds;
  }
}
