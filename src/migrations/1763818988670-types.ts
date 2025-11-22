import { MigrationInterface, QueryRunner } from "typeorm";

export class Types1763818988670 implements MigrationInterface {
    name = 'Types1763818988670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_tags" ADD "type" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_tags" DROP COLUMN "type"`);
    }

}
