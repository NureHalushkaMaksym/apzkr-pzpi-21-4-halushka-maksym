import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketAnalysis } from './market_analysis.entity';
import { CreateMarketAnalysisDto } from './create-market-analysis.dto';
import { UpdateMarketAnalysisDto } from './update-market-analysis.dto';

@Injectable()
export class MarketAnalysisService {
  constructor(
    @InjectRepository(MarketAnalysis)
    private marketAnalysisRepository: Repository<MarketAnalysis>,
  ) {}

  async findAll(): Promise<MarketAnalysis[]> {
    return this.marketAnalysisRepository.find();
  }

  async findOne(id: number): Promise<MarketAnalysis> {
    const analysis = await this.marketAnalysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new NotFoundException(`Market Analysis with ID ${id} not found`);
    }
    return analysis;
  }

  async create(createMarketAnalysisDto: CreateMarketAnalysisDto): Promise<MarketAnalysis> {
    const newAnalysis = this.marketAnalysisRepository.create(createMarketAnalysisDto);
    return this.marketAnalysisRepository.save(newAnalysis);
  }

  async update(id: number, updateMarketAnalysisDto: UpdateMarketAnalysisDto): Promise<MarketAnalysis> {
    const analysis = await this.findOne(id); // Check if the analysis exists
    const updatedAnalysis = Object.assign(analysis, updateMarketAnalysisDto);
    return this.marketAnalysisRepository.save(updatedAnalysis);
  }

  async remove(id: number): Promise<void> {
    const result = await this.marketAnalysisRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Market Analysis with ID ${id} not found`);
    }
  }
}
