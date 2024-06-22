import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { MarketAnalysisService } from './market_analysis.service';
import { MarketAnalysis } from './market_analysis.entity';

@Controller('market-analysis')
export class MarketAnalysisController {
  constructor(private readonly marketAnalysisService: MarketAnalysisService) {}

  @Get()
  findAll(): Promise<MarketAnalysis[]> {
    return this.marketAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<MarketAnalysis> {
    return this.marketAnalysisService.findOne(id);
  }

  @Post()
  create(@Body() marketAnalysis: MarketAnalysis): Promise<MarketAnalysis> {
    return this.marketAnalysisService.create(marketAnalysis);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() marketAnalysis: Partial<MarketAnalysis>): Promise<void> {
    return this.marketAnalysisService.update(id, marketAnalysis);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.marketAnalysisService.remove(id);
  }
}
