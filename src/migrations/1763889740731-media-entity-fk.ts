import { MigrationInterface, QueryRunner } from "typeorm";

export class MediaEntityFk1763889740731 implements MigrationInterface {
    name = 'MediaEntityFk1763889740731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" ADD "tag_media_id" uuid`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "UQ_b1248c7d88ce88197ae11554355" UNIQUE ("tag_media_id")`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "FK_b1248c7d88ce88197ae11554355" FOREIGN KEY ("tag_media_id") REFERENCES "tags_medias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "FK_b1248c7d88ce88197ae11554355"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "UQ_b1248c7d88ce88197ae11554355"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "tag_media_id"`);
    }

}
