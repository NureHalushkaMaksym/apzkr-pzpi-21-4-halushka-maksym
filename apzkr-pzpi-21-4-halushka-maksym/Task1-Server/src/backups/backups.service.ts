import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Backup } from './backup.entity';

@Injectable()
export class BackupsService {
  constructor(
    @InjectRepository(Backup)
    private backupsRepository: Repository<Backup>,
  ) {}

  findAll(): Promise<Backup[]> {
    return this.backupsRepository.find();
  }

  findOne(id: number): Promise<Backup> {
    return this.backupsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.backupsRepository.delete(id);
  }

  async create(backup: Backup): Promise<Backup> {
    return this.backupsRepository.save(backup);
  }

  async update(id: number, backup: Partial<Backup>): Promise<void> {
    await this.backupsRepository.update(id, backup);
  }
}
