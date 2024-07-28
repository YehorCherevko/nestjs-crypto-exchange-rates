import { registerAs } from '@nestjs/config';

export const exchangesConfig = registerAs('exchanges', () => ({
  binance: {
    baseURL: process.env.BINANCE_BASE_URL,
  },
  kucoin: {
    baseURL: process.env.KUCOIN_BASE_URL,
  },
  port: process.env.PORT,
}));
