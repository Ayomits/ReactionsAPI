import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medias')
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  is_uploaded: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
