import { AppConfig } from "#/config";
import { ReactionMediaEntity } from "#/entities/reaction-media.entity";
import { ReactionTagEntity } from "#/entities/reaction.entity";
import { CreateTables1763816199069 } from "#/migrations/1763816199069-create-tables";
import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: "postgres",
  entities: [ReactionTagEntity, ReactionMediaEntity],
  migrations: [CreateTables1763816199069],
});

export async function createDbConnection(log: FastifyInstance["log"]) {
  await dataSource.initialize();
  log.info("Db successfully connected");
}

export default dataSource;
