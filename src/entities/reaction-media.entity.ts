import {
  Column,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReactionTagEntity } from "./reaction.entity";

@Entity("reaction_medias")
export class ReactionMediaEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  url!: string;

  @ManyToOne(() => ReactionTagEntity, (tag) => tag.media, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tag_id" })
  tag!: ReactionTagEntity;

  @Column({ type: "uuid" })
  tag_id!: string;
}
