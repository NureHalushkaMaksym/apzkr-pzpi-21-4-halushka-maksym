import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMarketAnalysisDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status?: string;
}
