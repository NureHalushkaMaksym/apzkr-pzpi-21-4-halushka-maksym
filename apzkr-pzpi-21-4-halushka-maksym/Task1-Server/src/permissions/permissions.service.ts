import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async findOne(id: number): Promise<Permission | undefined> {
    return this.permissionsRepository.findOneBy({ id });
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const { name, role_id } = createPermissionDto;

    console.log('createPermissionDto:', createPermissionDto);
    console.log('name:', name);
    console.log('role_id:', role_id);

    if (!name || !role_id) {
      throw new Error('Name and role_id cannot be null');
    }

    const permission = this.permissionsRepository.create({
      name,
      role_id,
      permission: name // або якийсь інший логічний вміст, якщо вам потрібна ця колонка
    });

    return this.permissionsRepository.save(permission);
  }
}
