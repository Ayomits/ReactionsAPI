import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { In, Repository } from 'typeorm';
import { RoleNames } from './roles.const';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async onModuleInit() {
    const names = Object.values(RoleNames);
    const existedRoles = await this.roleRepository.find({
      where: { name: In(Object.values(RoleNames)) },
    });

    const existedRoleNames = existedRoles.map((r) => r.name);

    await this.roleRepository.save(
      names
        .filter((n) => !existedRoleNames.includes(n))
        .map((n) => ({ name: n })),
    );
  }

  async findUserRole() {
    return await this.roleRepository.findOneBy({ name: RoleNames.User });
  }

  async findSuperRole() {
    return await this.roleRepository.findOneBy({ name: RoleNames.Super });
  }
}
