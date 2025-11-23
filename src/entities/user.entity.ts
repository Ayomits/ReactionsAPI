import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Oauth2Entity } from './oauth2.entity';
import { TokenEntity } from './token.entity';

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
}
