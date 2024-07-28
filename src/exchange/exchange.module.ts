import { Module, DynamicModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { BinanceService } from './services/binance.service';
import { KuCoinService } from './services/kucoin.service';
import { exchangesConfig } from '../config/exchanges.config';
import { configValidationSchema } from '../config/configuration';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [exchangesConfig],
      validationSchema: configValidationSchema,
    }),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService, BinanceService, KuCoinService],
})
export class ExchangeModule {
  static register(): DynamicModule {
    return {
      module: ExchangeModule,
      providers: [
        {
          provide: 'EXCHANGES',
          useFactory: (
            binanceService: BinanceService,
            kucoinService: KuCoinService,
          ) => {
            return [binanceService, kucoinService];
          },
          inject: [BinanceService, KuCoinService],
        },
      ],
      exports: ['EXCHANGES'],
    };
  }
}
