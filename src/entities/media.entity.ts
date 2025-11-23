import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagMediaEntity } from './reaction-media.entity';
import { TagEntity } from './reaction.entity';

@Entity('medias')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  is_uploaded: boolean;

  @Column()
  path: string;

  @Column()
  bucketName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => TagMediaEntity, (r) => r.id)
  tag: TagEntity;
}
