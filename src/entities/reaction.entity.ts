import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReactionMediaEntity } from "./reaction-media.entity";

export const ReactionTagType = {
  OtakuApi: 0,
} as const;

@Entity("reaction_tags")
export class ReactionTagEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ default: ReactionTagType.OtakuApi })
  type!: number;

  @OneToMany(() => ReactionMediaEntity, (r) => r.url)
  media!: ReactionMediaEntity[];
}
