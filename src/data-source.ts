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
import { TokenEntity } from './entities/token.entity';
import { TokenEntity1763893472672 } from './migrations/1763893472672-token-entity';
import { TokenDateCols1763895572043 } from './migrations/1763895572043-token-date-cols';

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: 'postgres',
  entities: [
    TagEntity,
    TagMediaEntity,
    MediaEntity,
    Oauth2Entity,
    UserEntity,
    TokenEntity,
  ],
  migrations: [
    FirstMigration1763889493845,
    MediaEntityFk1763889740731,
    Oauth2User1763891144333,
    TokenEntity1763893472672,
    TokenDateCols1763895572043,
  ],
});

export async function createDbConnection() {
  await dataSource.initialize();
}

export default dataSource;
