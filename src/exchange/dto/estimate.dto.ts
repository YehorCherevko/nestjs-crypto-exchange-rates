import { IsNumberString, IsString } from 'class-validator';

export class EstimateDto {
  @IsNumberString()
  inputAmount: string;

  @IsString()
  inputCurrency: string;

  @IsString()
  outputCurrency: string;
}
