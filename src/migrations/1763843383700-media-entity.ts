import { MigrationInterface, QueryRunner } from 'typeorm';

export class MediaEntity1763843383700 implements MigrationInterface {
  name = 'MediaEntity1763843383700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_uploaded" boolean NOT NULL, CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "medias"`);
  }
}
