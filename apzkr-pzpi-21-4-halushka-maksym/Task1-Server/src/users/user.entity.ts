import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Sale } from '../sales/sale.entity';
import { Log } from '../logs/log.entity';
import { Notification } from '../notifications/notification.entity';
import { Role } from '../roles/role.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100, unique: true })
  email: string;

  @OneToMany(() => Sale, sale => sale.user)
  sales: Sale[];

  @OneToMany(() => Log, log => log.user)
  logs: Log[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Role, role => role.users)
  roles: Role[];
}
