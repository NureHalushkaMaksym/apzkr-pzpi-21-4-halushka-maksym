import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty()
  product_name: string;

  @ApiProperty()
  amount: number;
}
