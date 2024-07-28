import {
  Injectable,
  Logger,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Exchange } from './interfaces/exchange.interface';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  constructor(@Inject('EXCHANGES') private readonly exchanges: Exchange[]) {}

  async getRates(baseCurrency: string, quoteCurrency: string): Promise<any[]> {
    const rates = await Promise.all(
      this.exchanges.map(async (exchange) => {
        try {
          const rate = await exchange.getRate(baseCurrency, quoteCurrency);
          return { exchangeName: exchange.constructor.name, rate };
        } catch (error) {
          this.logger.error(
            `Error fetching rate from ${exchange.constructor.name}: ${error.message}`,
          );
          return null;
        }
      }),
    );

    return rates.filter((rate) => rate !== null);
  }

  async estimate(
    inputAmount: number,
    inputCurrency: string,
    outputCurrency: string,
  ): Promise<any> {
    const rates = await this.getRates(inputCurrency, outputCurrency);

    if (rates.length === 0) {
      throw new BadRequestException(
        `Unsupported currency pair: ${inputCurrency}/${outputCurrency}`,
      );
    }

    let bestExchange = rates[0];

    for (const rate of rates) {
      if (rate.rate * inputAmount > bestExchange.rate * inputAmount) {
        bestExchange = rate;
      }
    }

    return {
      exchangeName: bestExchange.exchangeName,
      outputAmount: inputAmount * bestExchange.rate,
    };
  }
}
