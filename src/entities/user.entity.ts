import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Oauth2Entity } from './oauth2.entity';
import { TokenEntity } from './token.entity';
import { MediaEntity } from './media.entity';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Oauth2Entity, (o) => o.user)
  oauth2: Oauth2Entity[];

  @OneToMany(() => TokenEntity, (t) => t.user)
  tokens: TokenEntity[];

  @OneToOne(() => MediaEntity, (m) => m.userAvatar, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'avatar_id' })
  avatar: MediaEntity;

  @ManyToMany(() => RoleEntity, (r) => r.users)
  @JoinTable()
  roles: RoleEntity[];
}
