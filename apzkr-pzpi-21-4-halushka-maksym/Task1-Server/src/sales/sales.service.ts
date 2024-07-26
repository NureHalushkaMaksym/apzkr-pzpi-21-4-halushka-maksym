import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './create-sale.dto';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { product_name, amount } = createSaleDto;

    if (!product_name || amount == null) {
      this.logger.error('Product name and amount are required');
      throw new Error('Product name and amount are required');
    }

    const newSale = new Sale();
    newSale.productName = product_name;
    newSale.amount = amount;

    this.logger.log('Creating new sale:', newSale);

    try {
      const savedSale = await this.salesRepository.save(newSale);
      this.logger.log('New sale saved:', savedSale);
      return savedSale;
    } catch (error) {
      this.logger.error('Error saving new sale:', error);
      throw new Error('Error saving new sale');
    }
  }

  async findAll(): Promise<Sale[]> {
    this.logger.log('Finding all sales');
    try {
      return await this.salesRepository.find();
    } catch (error) {
      this.logger.error('Error finding all sales:', error);
      throw new Error('Error finding all sales');
    }
  }

  async findOne(id: number): Promise<Sale> {
    this.logger.log(`Finding sale with ID: ${id}`);
    try {
      const sale = await this.salesRepository.findOne({ where: { id } });
      if (!sale) {
        this.logger.warn(`Sale with ID ${id} not found`);
        throw new NotFoundException(`Sale with ID ${id} not found`);
      }
      return sale;
    } catch (error) {
      this.logger.error(`Error finding sale with ID ${id}:`, error);
      throw new Error(`Error finding sale with ID ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing sale with ID: ${id}`);
    try {
      const deleteResult = await this.salesRepository.delete(id);
      if (!deleteResult.affected) {
        this.logger.warn(`Sale with ID ${id} not found`);
        throw new NotFoundException(`Sale with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Error removing sale with ID ${id}:`, error);
      throw new Error(`Error removing sale with ID ${id}`);
    }
  }

  async update(id: number, updateSaleDto: Partial<CreateSaleDto>): Promise<Sale> {
    this.logger.log(`Updating sale with ID: ${id}`, updateSaleDto);
    try {
      const sale = await this.salesRepository.preload({
        id,
        ...updateSaleDto,
      });

      if (!sale) {
        this.logger.warn(`Sale with ID ${id} not found`);
        throw new NotFoundException(`Sale with ID ${id} not found`);
      }

      const updatedSale = await this.salesRepository.save(sale);
      this.logger.log('Updated sale:', updatedSale);
      return updatedSale;
    } catch (error) {
      this.logger.error(`Error updating sale with ID ${id}:`, error);
      throw new Error(`Error updating sale with ID ${id}`);
    }
  }
}
