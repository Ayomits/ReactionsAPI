import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagMediaEntity } from './reaction-media.entity';

export const TagType = {
  OtakuApi: 0,
  Internal: 1,
} as const;

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => TagMediaEntity, (m) => m.tag)
  media!: TagMediaEntity[];
}
