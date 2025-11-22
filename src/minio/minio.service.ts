import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { AppConfig } from 'src/config';

@Injectable()
export class MinioService {
  client: Client;

  constructor() {
    this.client = new Client({
      endPoint: AppConfig.minioHost,
      accessKey: AppConfig.minioAccessKey,
      secretKey: AppConfig.minioSecretKey,
      useSSL: false,
      port: 9000,
    });
  }

  async createBucketIfNotExists(name: string) {
    const isExisted = await this.client.bucketExists(name);
    if (isExisted) {
      return;
    }

    await this.client.makeBucket(name, undefined);
  }

  buildMinioUrl(bucket: string, path: string) {
    const protocol = AppConfig.appEnv === 'dev' ? 'http' : 'https';
    const port = AppConfig.appEnv === 'dev' ? ':9000' : '';
    return `${protocol}://${AppConfig.minioHost}${port}/${bucket}/${path}`;
  }
}
