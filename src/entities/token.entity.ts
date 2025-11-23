import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export const TokenType = {
  Access: 0,
  Refresh: 1,
};

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  type!: number;

  @ManyToOne(() => UserEntity, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
