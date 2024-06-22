// update-sale.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSaleDto {
  @ApiProperty({ required: true })
  readonly product_name: string;

  @ApiProperty({ required: true })
  readonly amount: number;

  @ApiProperty({ required: false })
  readonly sale_date?: string;

  @ApiProperty({ required: false })
  readonly market_analysis?: string;
}
