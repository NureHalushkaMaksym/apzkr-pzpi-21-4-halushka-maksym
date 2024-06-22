import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the notification' })
  id: number;

  @ManyToOne(() => Users, user => user.notifications)
  @ApiProperty({ type: () => Users, description: 'The user associated with the notification' })
  user: Users;

  @Column('text')
  @ApiProperty({ example: 'Your data has been updated', description: 'The message content of the notification' })
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2024-06-13T12:34:56Z', description: 'The creation timestamp of the notification' })
  created_at: Date;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'The read status of the notification' })
  read: boolean;
}
