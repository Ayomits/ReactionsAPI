import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export const Oauth2ProviderId = {};

@Entity('oauth2')
export class Oauth2Entity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  provider: number;

  @ManyToOne(() => UserEntity, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
