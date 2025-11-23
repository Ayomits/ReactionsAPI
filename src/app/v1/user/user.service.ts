import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import bcrypt from 'bcrypt';
import { JsonApiResponse } from 'src/response/json-api';
import { RoleEntity } from 'src/entities/role.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private roleService: RolesService,
  ) {}

  async findUsersMe(req: any) {
    const userId = req.uid;
    return new JsonApiResponse({
      data: await this.findUserById(userId),
    });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['oauth2', 'avatar', 'roles'],
    });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['oauth2', 'avatar', 'roles'],
    });
  }

  async createUser(dto: CreateUserDto) {
    const userCount = await this.userRepository.count();

    let role: RoleEntity | null = null;

    if (userCount === 0) {
      role = await this.roleService.findSuperRole();
    } else {
      role = await this.roleService.findUserRole();
    }

    return await this.userRepository.save({
      ...dto,
      password: bcrypt.hashSync(dto.password, 5),
      roles: [role!],
    });
  }

  async validatePassword(inputPassword: string, hashedPassword: string) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
