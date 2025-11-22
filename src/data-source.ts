import { DataSource } from 'typeorm';
import { TagMediaEntity } from './entities/reaction-media.entity';
import { TagEntity } from './entities/reaction.entity';
import { AppConfig } from './config';
import { MediaEntity } from './entities/media.entity';
import { FirstMigration1763844923276 } from './migrations/1763844923276-first-migration';

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: 'postgres',
  entities: [TagEntity, TagMediaEntity, MediaEntity],
  migrations: [FirstMigration1763844923276],
});

export async function createDbConnection() {
  await dataSource.initialize();
}

export default dataSource;
