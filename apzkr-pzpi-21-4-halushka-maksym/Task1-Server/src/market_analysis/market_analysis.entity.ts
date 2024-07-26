import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MarketAnalysis {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the market analysis' })
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2023-07-07T00:00:00.000Z', description: 'The date of the analysis' })
  analysis_date: Date;

  @Column({ type: 'jsonb' })
  @ApiProperty({ example: {}, description: 'The data of the market analysis' })
  data: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'Analysis description', description: 'Description of the market analysis' })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty({ example: 'Pending', description: 'Status of the market analysis' })
  status: string;
}
