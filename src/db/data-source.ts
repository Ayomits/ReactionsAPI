import { AppConfig } from "#/config";
import { ReactionMediaEntity } from "#/entities/reaction-media.entity";
import { ReactionTagEntity } from "#/entities/reaction.entity";
import { CreateTables1763816199069 } from "#/migrations/1763816199069-create-tables";
import { Types1763818988670 } from "#/migrations/1763818988670-types";
import { Fk1763819747608 } from "#/migrations/1763819747608-fk";
import { FastifyInstance } from "fastify";
import { DataSource } from "typeorm";

process.loadEnvFile();

const dataSource = new DataSource({
  url: AppConfig.dbUrl,
  type: "postgres",
  entities: [ReactionTagEntity, ReactionMediaEntity],
  migrations: [CreateTables1763816199069, Types1763818988670, Fk1763819747608],
});

export async function createDbConnection(log: FastifyInstance["log"]) {
  await dataSource.initialize();
  log.info("Db successfully connected");
}

export default dataSource;
