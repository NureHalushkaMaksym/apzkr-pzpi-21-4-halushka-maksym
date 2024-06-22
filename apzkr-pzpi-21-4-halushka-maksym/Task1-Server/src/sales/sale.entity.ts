import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/user.entity'; // Переконайтеся, що Users правильно імпортується

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

  @ManyToOne(() => Users, user => user.sales) // Встановлення зв'язку з користувачем
  @JoinColumn({ name: 'userId' }) // Вказівка на зовнішній ключ
  user: Users; // Визначення типу поля user як Users

}
