import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagMediaEntity } from './tag-media.entity';
import { TagEntity } from './reaction.entity';
import { UserEntity } from './user.entity';

@Entity('medias')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  is_uploaded: boolean;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  bucketName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => TagMediaEntity, (r) => r.id, { onDelete: 'CASCADE' })
  tag: TagEntity;

  @OneToOne(() => TagMediaEntity, { cascade: true })
  @JoinColumn({ name: 'tag_media_id' })
  tagMedia: TagMediaEntity;

  @OneToOne(() => UserEntity, (u) => u.avatar, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'avatar_user_id' })
  userAvatar: UserEntity;
}
