import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MarketAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  analysis_date: Date;

  @Column({ type: 'jsonb' })
  data: Record<string, any>;
}
