import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketAnalysis } from './market_analysis.entity';
import { MarketAnalysisService } from './market_analysis.service';
import { MarketAnalysisController } from './market_analysis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MarketAnalysis])],
  providers: [MarketAnalysisService],
  controllers: [MarketAnalysisController],
})
export class MarketAnalysisModule {}
