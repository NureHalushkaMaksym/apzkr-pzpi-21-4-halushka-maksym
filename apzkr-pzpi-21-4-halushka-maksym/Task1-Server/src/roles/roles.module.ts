import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UsersModule } from '../users/users.module'; // Імпортуємо UsersModule
import { Permission } from '../permissions/permission.entity'; // Імпортуємо Permission entity

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), UsersModule], // Додаємо UsersModule
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
