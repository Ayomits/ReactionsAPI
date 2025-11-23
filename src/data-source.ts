import { DataSource } from 'typeorm';
import { TagMediaEntity } from './entities/tag-media.entity';
import { TagEntity } from './entities/reaction.entity';
import { AppConfig } from './config';
import { MediaEntity } from './entities/media.entity';
import { FirstMigration1763889493845 } from './migrations/1763889493845-first-migration';
import { MediaEntityFk1763889740731 } from './migrations/1763889740731-media-entity-fk';

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: 'postgres',
  entities: [TagEntity, TagMediaEntity, MediaEntity],
  migrations: [FirstMigration1763889493845, MediaEntityFk1763889740731],
});

export async function createDbConnection() {
  await dataSource.initialize();
}

export default dataSource;
