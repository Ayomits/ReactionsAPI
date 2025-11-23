import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenDateCols1763895572043 implements MigrationInterface {
    name = 'TokenDateCols1763895572043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "created_at"`);
    }

}
