import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ example: 'admin', description: 'The name of the role', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: [Number], description: 'List of user IDs assigned to the role', required: false })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  userIds?: number[];

  @ApiProperty({ type: [Number], description: 'List of permission IDs assigned to the role', required: false })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  permissionIds?: number[];
}
