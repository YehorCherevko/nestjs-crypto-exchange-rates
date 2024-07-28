import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BaseExchangeService } from './base-exchange.service';

@Injectable()
export class KuCoinService extends BaseExchangeService {
  protected readonly baseURL = this.configService.get<string>(
    'exchanges.kucoin.baseURL',
  );
  protected readonly supportedCurrencies = ['BTC', 'ETH', 'USDT'];
  protected readonly symbolMap = {
    BTC: { ETH: 'ETH-BTC', USDT: 'BTC-USDT' },
    ETH: { BTC: 'ETH-BTC', USDT: 'ETH-USDT' },
    USDT: { BTC: 'BTC-USDT', ETH: 'ETH-USDT' },
  };

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    super(httpService, configService);
  }

  protected async fetchPrice(symbol: string): Promise<number> {
    const endpoint = `${this.baseURL}/api/v1/market/orderbook/level1`;
    const data = await this.fetchData(endpoint, { symbol });
    if (!data.data || !data.data.price) {
      throw new Error('Invalid response data');
    }
    return parseFloat(data.data.price);
  }
}
