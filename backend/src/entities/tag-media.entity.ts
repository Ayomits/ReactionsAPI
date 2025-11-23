import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagEntity } from './reaction.entity';
import { MediaEntity } from './media.entity';

@Entity('tags_medias')
export class TagMediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  url!: string;

  @ManyToOne(() => TagEntity, (tag) => tag.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tag_id' })
  tag!: TagEntity;

  @OneToOne(() => MediaEntity, (e) => e.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'media_id' })
  media: MediaEntity;
}
