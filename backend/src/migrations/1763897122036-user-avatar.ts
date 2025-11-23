import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAvatar1763897122036 implements MigrationInterface {
    name = 'UserAvatar1763897122036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c3401836efedec3bec459c8f818" UNIQUE ("avatar_id")`);
        await queryRunner.query(`ALTER TABLE "medias" ADD "avatar_user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "UQ_f1c4808103d3dc4b9d52cdd73b6" UNIQUE ("avatar_user_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medias" ADD CONSTRAINT "FK_f1c4808103d3dc4b9d52cdd73b6" FOREIGN KEY ("avatar_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "FK_f1c4808103d3dc4b9d52cdd73b6"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP CONSTRAINT "UQ_f1c4808103d3dc4b9d52cdd73b6"`);
        await queryRunner.query(`ALTER TABLE "medias" DROP COLUMN "avatar_user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c3401836efedec3bec459c8f818"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_id"`);
    }

}
