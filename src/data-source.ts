import { DataSource } from 'typeorm';
import { ReactionMediaEntity } from './entities/reaction-media.entity';
import { ReactionTagEntity } from './entities/reaction.entity';
import { CreateTables1763816199069 } from './migrations/1763816199069-create-tables';
import { Types1763818988670 } from './migrations/1763818988670-types';
import { Fk1763819747608 } from './migrations/1763819747608-fk';
import { AppConfig } from './config';
import { MediaType1763839257250 } from './migrations/1763839257250-media-type';

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: 'postgres',
  entities: [ReactionTagEntity, ReactionMediaEntity],
  migrations: [
    CreateTables1763816199069,
    Types1763818988670,
    Fk1763819747608,
    MediaType1763839257250,
  ],
});

export async function createDbConnection() {
  await dataSource.initialize();
}

export default dataSource;
