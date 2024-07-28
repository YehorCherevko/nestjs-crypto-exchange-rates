import { IsString } from 'class-validator';

export class GetRatesDto {
  @IsString()
  baseCurrency: string;

  @IsString()
  quoteCurrency: string;
}
