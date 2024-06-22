import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './role-create.dto';
import { UpdateRoleDto } from './role-update.dto';
import { Users } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['users', 'permissions'] });
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne({ where: { id }, relations: ['users', 'permissions'] });
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { userIds, permissionIds, ...roleData } = createRoleDto;
    
    const users = await this.usersRepository.findByIds(userIds);
    const permissions = await this.permissionsRepository.findByIds(permissionIds);
    
    const role = this.rolesRepository.create({
      ...roleData,
      users,
      permissions
    });
    
    return this.rolesRepository.save(role);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<void> {
    const { userIds, permissionIds, ...roleData } = updateRoleDto;
    
    if (userIds) {
      const users = await this.usersRepository.findByIds(userIds);
      roleData['users'] = users;
    }
    
    if (permissionIds) {
      const permissions = await this.permissionsRepository.findByIds(permissionIds);
      roleData['permissions'] = permissions;
    }
    
    await this.rolesRepository.update(id, roleData);
  }
}
