import { Controller, Get, Post, Param, Delete, Body, Put, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MarketAnalysisService } from './market_analysis.service';
import { MarketAnalysis } from './market_analysis.entity';

@ApiTags('market-analysis')
@Controller('market-analysis')
export class MarketAnalysisController {
  private readonly logger = new Logger(MarketAnalysisController.name);

  constructor(private readonly marketAnalysisService: MarketAnalysisService) {}

  @Get()
  @ApiOperation({ summary: 'Get all market analyses' })
  @ApiResponse({ status: 200, description: 'Return all market analyses.' })
  findAll(): Promise<MarketAnalysis[]> {
    this.logger.log('GET /market-analysis');
    return this.marketAnalysisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a market analysis by ID' })
  @ApiResponse({ status: 200, description: 'Market analysis retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Market analysis not found' })
  findOne(@Param('id') id: number): Promise<MarketAnalysis> {
    this.logger.log(`GET /market-analysis/${id}`);
    return this.marketAnalysisService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new market analysis' })
  @ApiResponse({ status: 201, description: 'Market analysis created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() marketAnalysis: MarketAnalysis): Promise<MarketAnalysis> {
    this.logger.log('POST /market-analysis');
    return this.marketAnalysisService.create(marketAnalysis);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete market analysis by id' })
  @ApiResponse({ status: 200, description: 'The market analysis has been successfully deleted.' })
  remove(@Param('id') id: number): Promise<void> {
    this.logger.log(`DELETE /market-analysis/${id}`);
    return this.marketAnalysisService.remove(id);
  }
}
