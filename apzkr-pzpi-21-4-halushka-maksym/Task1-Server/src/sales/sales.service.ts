// sales.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const { product_name, amount } = createSaleDto;
    
    // Перевіряємо, чи передано product_name
    if (!product_name) {
      throw new Error('Product name is required');
    }

    // Створюємо новий об'єкт Sale з використанням createSaleDto
    const newSale = new Sale();
    newSale.productName = product_name;
    newSale.amount = amount;

    // Зберігаємо новий об'єкт Sale в базі даних
    return this.salesRepository.save(newSale);
  }

  findAll(): Promise<Sale[]> {
    return this.salesRepository.find();
  }

  async findOne(id: number): Promise<Sale> {
    return this.salesRepository.findOne({ where: { id } });
  }
  
  async remove(id: number): Promise<DeleteResult> {
    return this.salesRepository.delete(id);
  }

  async update(id: number, updateSaleDto: Partial<CreateSaleDto>): Promise<Sale> {
    // Використовуємо preload для часткового оновлення об'єкта Sale
    const sale = await this.salesRepository.preload({
      id,
      ...updateSaleDto,
    });
    
    // Перевіряємо, чи знайдено об'єкт Sale за вказаним ID
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    
    // Зберігаємо оновлений об'єкт Sale в базі даних
    return this.salesRepository.save(sale);
  }
}
