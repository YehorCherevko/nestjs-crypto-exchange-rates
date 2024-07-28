import {
  Controller,
  Get,
  Query,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { GetRatesDto } from './dto/get-rates.dto';
import { EstimateDto } from './dto/estimate.dto';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('getRates')
  async getRates(
    @Query(new ValidationPipe({ transform: true })) query: GetRatesDto,
  ) {
    try {
      const { baseCurrency, quoteCurrency } = query;
      const rates = await this.exchangeService.getRates(
        baseCurrency,
        quoteCurrency,
      );
      if (rates.length === 0) {
        throw new BadRequestException(
          `Unsupported currency pair: ${baseCurrency}/${quoteCurrency}`,
        );
      }
      return rates;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('estimate')
  async estimate(
    @Query(new ValidationPipe({ transform: true })) query: EstimateDto,
  ) {
    try {
      const { inputAmount, inputCurrency, outputCurrency } = query;
      return await this.exchangeService.estimate(
        parseFloat(inputAmount),
        inputCurrency,
        outputCurrency,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
