import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'CAN_VIEW_DASHBOARD', description: 'The name of the permission' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'The ID of the role associated with this permission' })
  @IsNumber()
  role_id: number;
}
