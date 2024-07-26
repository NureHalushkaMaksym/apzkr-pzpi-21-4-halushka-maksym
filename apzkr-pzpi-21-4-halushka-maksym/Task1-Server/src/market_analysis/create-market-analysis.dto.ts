import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMarketAnalysisDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
