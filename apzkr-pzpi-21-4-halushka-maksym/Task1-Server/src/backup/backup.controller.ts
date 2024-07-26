import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('api/backup')
export class BackupController {
  @Get('download')
  async downloadBackup(@Res() res: Response) {
    const filePath = path.resolve('C:/Users/maxha/backup/bd.sql'); // Використання прямого слешу

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Failed to send file:', err.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to send file', error: err.message });
      }
    });
  }
}
