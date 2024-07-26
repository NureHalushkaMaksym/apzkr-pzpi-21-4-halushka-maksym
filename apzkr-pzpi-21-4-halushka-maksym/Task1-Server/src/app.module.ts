import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { MarketAnalysisModule } from './market_analysis/market_analysis.module'; 
import { BackupModule } from './backup/backup.module'; 
import { Users } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Permission } from './permissions/permission.entity';
import { Sale } from './sales/sale.entity';
import { MarketAnalysis } from './market_analysis/market_analysis.entity';
import { Notification } from './notifications/notification.entity';
import { Log } from './logs/log.entity';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [Users, Role, Permission, Sale, MarketAnalysis, Notification, Log],
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SalesModule,
    NotificationsModule,
    RolesModule,
    PermissionsModule,
    HealthModule,
    AuthModule,
    MarketAnalysisModule, // додано MarketAnalysisModule
    BackupModule, // додано BackupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
