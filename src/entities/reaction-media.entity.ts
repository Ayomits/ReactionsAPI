import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReactionTagEntity } from './reaction.entity';

@Entity('reaction_medias')
export class ReactionMediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  url!: string;

  @Column({})
  type: number;

  @ManyToOne(() => ReactionTagEntity, (tag) => tag.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag!: ReactionTagEntity;
}
