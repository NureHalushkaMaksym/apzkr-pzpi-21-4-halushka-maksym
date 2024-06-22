import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { BackupsService } from './backups.service';
import { Backup } from './backup.entity';

@Controller('backups')
export class BackupsController {
  constructor(private readonly backupsService: BackupsService) {}

  @Get()
  findAll(): Promise<Backup[]> {
    return this.backupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Backup> {
    return this.backupsService.findOne(id);
  }

  @Post()
  create(@Body() backup: Backup): Promise<Backup> {
    return this.backupsService.create(backup);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() backup: Partial<Backup>): Promise<void> {
    return this.backupsService.update(id, backup);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.backupsService.remove(id);
  }
}
