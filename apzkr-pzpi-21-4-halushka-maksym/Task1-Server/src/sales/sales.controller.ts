// sales.controller.ts
import { Controller, Get, Post, Param, Delete, Body, Put, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sale.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSaleDto } from './create-sale.dto';
import { UpdateSaleDto } from './update-sale.dto';

@ApiTags('sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({ status: 200, description: 'Return all sales.', type: [Sale] })
  findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by id' })
  @ApiParam({ name: 'id', description: 'The ID of the sale', type: Number })
  @ApiResponse({ status: 200, description: 'Return the sale by id.', type: Sale })
  findOne(@Param('id') id: number): Promise<Sale> {
    return this.salesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, description: 'The sale has been created.', type: Sale })
  async create(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a sale' })
  @ApiParam({ name: 'id', description: 'The ID of the sale', type: Number })
  @ApiBody({ type: UpdateSaleDto })
  @ApiResponse({ status: 200, description: 'The sale has been updated.', type: Sale })
  async update(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto): Promise<Sale> {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sale' })
  @ApiParam({ name: 'id', description: 'The ID of the sale', type: Number })
  @ApiResponse({ status: 200, description: 'The sale has been deleted.' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.salesService.remove(id);
  }
}
