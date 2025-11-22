import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReactionMediaEntity } from "./reaction-media.entity";

@Entity("reaction_tags")
export class ReactionTagEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => ReactionMediaEntity, (r) => r.url)
  media!: ReactionMediaEntity[];
}
