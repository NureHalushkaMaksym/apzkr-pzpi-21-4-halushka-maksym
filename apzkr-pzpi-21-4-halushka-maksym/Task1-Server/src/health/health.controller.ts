import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check health' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  checkHealth(): string {
    return 'Service is healthy';
  }
}
