import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column()
  role_id: number;

  @Column({ nullable: true })
  permission: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
}
