import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Backup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  backup_date: Date;

  @Column()
  file_path: string;
}
