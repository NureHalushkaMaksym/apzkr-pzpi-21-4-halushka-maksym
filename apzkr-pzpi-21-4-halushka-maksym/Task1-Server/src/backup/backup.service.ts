import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class BackupService {
  private readonly backupDir = path.resolve('C:', 'Users', 'maxha', 'backup');

  constructor() {
    // Створіть директорію, якщо вона не існує
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(this.backupDir, `backup-${timestamp}.sql`);
    console.log(`Creating backup at: ${backupFile}`);

    try {
      await execPromise(`pg_dump -U postgres -F c -b -v -f "${backupFile}" my_database`);
      console.log(`Backup created at: ${backupFile}`);
      return backupFile;
    } catch (error) {
      console.error('Backup creation failed:', error.message);
      throw new Error('Backup failed');
    }
  }

  async downloadBackup(filePath: string): Promise<Buffer> {
    console.log(`Downloading backup from: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    try {
      return fs.promises.readFile(filePath);
    } catch (error) {
      console.error('File read failed:', error.message);
      throw new Error('File read failed');
    }
  }

  async getLatestBackupFile(): Promise<string> {
    const files = await fs.promises.readdir(this.backupDir);
    if (files.length === 0) {
      throw new Error('No backup files found');
    }

    const sortedFiles = files
      .map(file => ({
        file,
        stats: fs.statSync(path.join(this.backupDir, file)),
      }))
      .sort((a, b) => b.stats.mtimeMs - a.stats.mtimeMs);

    const latestFile = path.join(this.backupDir, sortedFiles[0].file);
    console.log(`Latest backup file: ${latestFile}`);
    return latestFile;
  }
}
