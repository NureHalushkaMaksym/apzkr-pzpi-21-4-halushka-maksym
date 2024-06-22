import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Users } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'The name of the role' })
  @IsString()
  name: string;

  @ApiProperty({ type: () => [Number], description: 'List of user IDs assigned to the role' })
  @IsArray()
  @ArrayNotEmpty()
  userIds: number[];

  @ApiProperty({ type: () => [Number], description: 'List of permission IDs assigned to the role' })
  @IsArray()
  @ArrayNotEmpty()
  permissionIds: number[];
}
