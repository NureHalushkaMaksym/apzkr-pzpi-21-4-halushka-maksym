import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketAnalysis } from './market_analysis.entity';

@Injectable()
export class MarketAnalysisService {
  constructor(
    @InjectRepository(MarketAnalysis)
    private marketAnalysisRepository: Repository<MarketAnalysis>,
  ) {}

  findAll(): Promise<MarketAnalysis[]> {
    return this.marketAnalysisRepository.find();
  }

  findOne(id: number): Promise<MarketAnalysis> {
    return this.marketAnalysisRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.marketAnalysisRepository.delete(id);
  }

  async create(marketAnalysis: MarketAnalysis): Promise<MarketAnalysis> {
    return this.marketAnalysisRepository.save(marketAnalysis);
  }

  async update(id: number, marketAnalysis: Partial<MarketAnalysis>): Promise<void> {
    await this.marketAnalysisRepository.update(id, marketAnalysis);
  }
}
