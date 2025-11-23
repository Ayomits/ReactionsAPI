import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1763889493845 implements MigrationInterface {
    name = 'FirstMigration1763889493845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_uploaded" boolean NOT NULL, "path" character varying, "bucketName" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags_medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "tag_id" uuid, "media_id" uuid, CONSTRAINT "REL_6bacedb2c7cc55477383135e3c" UNIQUE ("media_id"), CONSTRAINT "PK_c21ccac02863c9b947c275705ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tags_medias" ADD CONSTRAINT "FK_3dcc1f14991378c9fe9e4523034" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags_medias" ADD CONSTRAINT "FK_6bacedb2c7cc55477383135e3c4" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags_medias" DROP CONSTRAINT "FK_6bacedb2c7cc55477383135e3c4"`);
        await queryRunner.query(`ALTER TABLE "tags_medias" DROP CONSTRAINT "FK_3dcc1f14991378c9fe9e4523034"`);
        await queryRunner.query(`DROP TABLE "tags_medias"`);
        await queryRunner.query(`DROP TABLE "medias"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
