import { MigrationInterface, QueryRunner } from 'typeorm';

export class MediaType1763839257250 implements MigrationInterface {
  name = 'MediaType1763839257250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reaction_tags" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" ADD "type" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" DROP CONSTRAINT "FK_854d8956ffd04a26943c792ff9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" ALTER COLUMN "tag_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" ADD CONSTRAINT "FK_854d8956ffd04a26943c792ff9c" FOREIGN KEY ("tag_id") REFERENCES "reaction_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" DROP CONSTRAINT "FK_854d8956ffd04a26943c792ff9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" ALTER COLUMN "tag_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reaction_medias" ADD CONSTRAINT "FK_854d8956ffd04a26943c792ff9c" FOREIGN KEY ("tag_id") REFERENCES "reaction_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "reaction_medias" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "reaction_tags" ADD "type" integer NOT NULL DEFAULT '0'`,
    );
  }
}
