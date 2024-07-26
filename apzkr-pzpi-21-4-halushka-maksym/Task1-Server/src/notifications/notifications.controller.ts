import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'Return all notifications.', type: [Notification] })
  findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by id' })
  @ApiParam({ name: 'id', description: 'The ID of the notification', type: Number })
  @ApiResponse({ status: 200, description: 'Return the notification by id.', type: Notification })
  findOne(@Param('id') id: number): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiBody({ type: Notification })
  @ApiResponse({ status: 201, description: 'The notification has been created.', type: Notification })
  create(@Body() notification: Notification): Promise<Notification> {
    return this.notificationsService.create(notification);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiParam({ name: 'id', description: 'The ID of the notification', type: Number })
  @ApiResponse({ status: 200, description: 'The notification has been deleted.' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.notificationsService.remove(id);
  }
}
