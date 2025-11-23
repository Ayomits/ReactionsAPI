import { MigrationInterface, QueryRunner } from "typeorm";

export class Oauth2User1763891144333 implements MigrationInterface {
    name = 'Oauth2User1763891144333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "oauth2" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" integer NOT NULL, "user_id" uuid, CONSTRAINT "PK_0483465628944a979827bc41c46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "oauth2" ADD CONSTRAINT "FK_133f2f2a8e3c6693fa21c066e16" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oauth2" DROP CONSTRAINT "FK_133f2f2a8e3c6693fa21c066e16"`);
        await queryRunner.query(`DROP TABLE "oauth2"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
