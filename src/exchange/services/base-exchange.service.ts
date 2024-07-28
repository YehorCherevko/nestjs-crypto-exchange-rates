import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Exchange } from '../interfaces/exchange.interface';
import {
  fetchData,
  formatSymbol,
  invertRate,
  isValidCurrency,
} from '../utils/exchange.utils';

@Injectable()
export abstract class BaseExchangeService implements Exchange {
  protected readonly logger = new Logger(this.constructor.name);
  protected abstract readonly baseURL: string;
  protected abstract readonly supportedCurrencies: string[];
  protected abstract readonly symbolMap: {
    [key: string]: { [key: string]: string };
  };

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {}

  protected formatSymbol(baseCurrency: string, quoteCurrency: string): string {
    return formatSymbol(this.symbolMap, baseCurrency, quoteCurrency);
  }

  protected invertRate(rate: number): number {
    return invertRate(rate);
  }

  protected isValidCurrency(currency: string): boolean {
    return isValidCurrency(this.supportedCurrencies, currency);
  }

  protected async fetchData(endpoint: string, params: any): Promise<any> {
    return fetchData(this.httpService, endpoint, params, this.logger);
  }

  protected abstract fetchPrice(symbol: string): Promise<number>;

  async getRate(baseCurrency: string, quoteCurrency: string): Promise<number> {
    if (
      !this.isValidCurrency(baseCurrency) ||
      !this.isValidCurrency(quoteCurrency)
    ) {
      throw new Error(
        `Unsupported currency pair: ${baseCurrency}/${quoteCurrency}`,
      );
    }

    const symbol = this.formatSymbol(baseCurrency, quoteCurrency);
    try {
      this.logger.log(`Fetching price for symbol: ${symbol}`);
      const price = await this.fetchPrice(symbol);
      if (
        (baseCurrency === 'BTC' && quoteCurrency === 'ETH') ||
        (baseCurrency === 'USDT' && quoteCurrency === 'BTC') ||
        (baseCurrency === 'USDT' && quoteCurrency === 'ETH')
      ) {
        return this.invertRate(price);
      }
      return price;
    } catch (error) {
      this.logger.error(
        `Failed to fetch price for ${symbol}: ${error.message}`,
      );
      throw new Error(`Failed to fetch price for ${symbol}`);
    }
  }
}
