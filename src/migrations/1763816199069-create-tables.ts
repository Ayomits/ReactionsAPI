import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1763816199069 implements MigrationInterface {
  name = 'CreateTables1763816199069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reaction_medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, CONSTRAINT "PK_44a182bece5d97d0e519e256eee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reaction_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_7e2157da26c523392a29724b775" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reaction_tags"`);
    await queryRunner.query(`DROP TABLE "reaction_medias"`);
  }
}
