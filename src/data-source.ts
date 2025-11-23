import { DataSource } from 'typeorm';
import { TagMediaEntity } from './entities/tag-media.entity';
import { TagEntity } from './entities/reaction.entity';
import { AppConfig } from './config';
import { MediaEntity } from './entities/media.entity';
import { FirstMigration1763889493845 } from './migrations/1763889493845-first-migration';
import { MediaEntityFk1763889740731 } from './migrations/1763889740731-media-entity-fk';
import { Oauth2Entity } from './entities/oauth2.entity';
import { UserEntity } from './entities/user.entity';
import { Oauth2User1763891144333 } from './migrations/1763891144333-oauth2-user';

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: 'postgres',
  entities: [TagEntity, TagMediaEntity, MediaEntity, Oauth2Entity, UserEntity],
  migrations: [
    FirstMigration1763889493845,
    MediaEntityFk1763889740731,
    Oauth2User1763891144333,
  ],
});

export async function createDbConnection() {
  await dataSource.initialize();
}

export default dataSource;
