import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'Return all permissions.', type: [Permission] })
  async findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permission by id' })
  @ApiParam({ name: 'id', description: 'The ID of the permission', type: Number })
  @ApiResponse({ status: 200, description: 'Return the permission by id.', type: Permission })
  async findOne(@Param('id') id: number): Promise<Permission | undefined> {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'The permission has been created.', type: Permission })
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    if (!createPermissionDto.name || !createPermissionDto.role_id) {
      throw new BadRequestException('Name and role_id cannot be null');
    }
    return this.permissionsService.create(createPermissionDto);
  }
}
