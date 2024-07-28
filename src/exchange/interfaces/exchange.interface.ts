export interface Exchange {
  getRate(baseCurrency: string, quoteCurrency: string): Promise<number>;
}
