import { Controller, Get, Post, Param, Delete, Body, Put, UseGuards, Logger } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sale.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateSaleDto } from './create-sale.dto';
import { UpdateSaleDto } from './update-sale.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  private readonly logger = new Logger(SalesController.name);

  constructor(private readonly salesService: SalesService) {}

  @Get('view-product-list')
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'Return all sales.', type: [Sale] })
  findAll(): Promise<Sale[]> {
    this.logger.log('Getting all sales');
    return this.salesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by id' })
  @ApiParam({ name: 'id', description: 'The ID of the sale', type: Number })
  @ApiResponse({ status: 200, description: 'Return the sale by id.', type: Sale })
  findOne(@Param('id') id: number): Promise<Sale> {
    this.logger.log(`Getting sale with ID: ${id}`);
    return this.salesService.findOne(id);
  }

  @Post('add-product')
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, description: 'The sale has been created.', type: Sale })
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    this.logger.log('Creating new sale:', createSaleDto);
    return this.salesService.create(createSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale' })
  @ApiParam({ name: 'id', description: 'The ID of the sale', type: Number })
  @ApiResponse({ status: 200, description: 'The sale has been deleted.' })
  async remove(@Param('id') id: number): Promise<void> {
    this.logger.log(`Deleting sale with ID: ${id}`);
    await this.salesService.remove(id);
  }
}
