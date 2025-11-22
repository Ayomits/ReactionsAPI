import { MigrationInterface, QueryRunner } from "typeorm";

export class Fk1763819747608 implements MigrationInterface {
    name = 'Fk1763819747608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_medias" ADD "tag_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reaction_medias" ADD CONSTRAINT "FK_854d8956ffd04a26943c792ff9c" FOREIGN KEY ("tag_id") REFERENCES "reaction_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_medias" DROP CONSTRAINT "FK_854d8956ffd04a26943c792ff9c"`);
        await queryRunner.query(`ALTER TABLE "reaction_medias" DROP COLUMN "tag_id"`);
    }

}
