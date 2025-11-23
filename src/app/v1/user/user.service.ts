import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['oauth2'],
    });
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.save({
      ...dto,
      password: bcrypt.hashSync(dto.password, 5),
    });
  }

  async validatePassword(inputPassword: string, hashedPassword: string) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
