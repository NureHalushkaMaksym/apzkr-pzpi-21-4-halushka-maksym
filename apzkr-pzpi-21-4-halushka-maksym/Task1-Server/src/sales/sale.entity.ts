// src/sales/sale.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/user.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_name', length: 100 })
  productName: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'sale_date', default: () => 'CURRENT_TIMESTAMP' })
  saleDate: Date;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Users, user => user.sales)
  @JoinColumn({ name: 'userId' })
  user: Users;
}
