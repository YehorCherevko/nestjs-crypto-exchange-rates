import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BaseExchangeService } from './base-exchange.service';

@Injectable()
export class BinanceService extends BaseExchangeService {
  protected readonly baseURL = this.configService.get<string>(
    'exchanges.binance.baseURL',
  );
  protected readonly supportedCurrencies = ['BTC', 'ETH', 'USDT'];
  protected readonly symbolMap = {
    BTC: { ETH: 'ETHBTC', USDT: 'BTCUSDT' },
    ETH: { BTC: 'ETHBTC', USDT: 'ETHUSDT' },
    USDT: { BTC: 'BTCUSDT', ETH: 'ETHUSDT' },
  };

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    super(httpService, configService);
  }

  protected async fetchPrice(symbol: string): Promise<number> {
    const endpoint = `${this.baseURL}/api/v3/ticker/price`;
    const data = await this.fetchData(endpoint, { symbol });
    return parseFloat(data.price);
  }
}
