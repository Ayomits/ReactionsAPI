import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reaction_medias")
export class ReactionMediaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  url!: string;
}
