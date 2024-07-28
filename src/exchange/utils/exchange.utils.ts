import { Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

export async function fetchData(
  httpService: HttpService,
  endpoint: string,
  params: any,
  logger: Logger,
): Promise<any> {
  try {
    const response = await firstValueFrom(
      httpService.get(endpoint, { params }),
    );
    return response.data;
  } catch (error) {
    logger.error(`Failed to fetch data from ${endpoint}: ${error.message}`);
    if (error.response) {
      logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    throw new Error('Failed to fetch data');
  }
}

export function formatSymbol(
  symbolMap: any,
  baseCurrency: string,
  quoteCurrency: string,
): string {
  return (
    symbolMap[baseCurrency]?.[quoteCurrency] ||
    `${baseCurrency}${quoteCurrency}`.toUpperCase()
  );
}

export function invertRate(rate: number): number {
  return 1 / rate;
}

export function isValidCurrency(
  supportedCurrencies: string[],
  currency: string,
): boolean {
  return supportedCurrencies.includes(currency);
}
