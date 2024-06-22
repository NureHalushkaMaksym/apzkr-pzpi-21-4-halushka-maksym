import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Users } from '../users/user.entity';
import { Permission } from '../permissions/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @ManyToMany(() => Users, user => user.roles)
  @JoinTable()
  users: Users[];

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
