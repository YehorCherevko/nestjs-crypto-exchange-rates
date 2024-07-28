# NestJS Exchange Rates Service

This is a NestJS-based service that provides exchange rates from Binance and KuCoin. The service offers endpoints to fetch exchange rates and estimate currency conversions.

## Prerequisites

- Node.js (for local development)
- pnpm (for package management)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/nestjs-exchange-rates.git
   cd nestjs-crypto-exchange-rates
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Configuration

Create a `.env` file in the root of the project and set the following environment variables:

BINANCE_BASE_URL=https://api.binance.com
KUCOIN_BASE_URL=https://api.kucoin.com
PORT=3000

## Running the Application

### Locally

To run the application locally, use the following command:

```bash
pnpm start:dev

```

#### API Endpoints

Get Rates
URL: /exchange/getRates
Method: GET
Query Parameters:
baseCurrency (string) - The base currency (BTC/ETH/USDT)
quoteCurrency (string) - The quote currency (BTC/ETH/USDT)

Response:

[
{
"exchangeName": "BinanceService",
"rate": 0.031
},
{
"exchangeName": "KuCoinService",
"rate": 0.032
}
]

Estimate
URL: /exchange/estimate
Method: GET
Query Parameters:
inputAmount (string) - The amount to convert
inputCurrency (string) - The input currency (BTC/ETH/USDT)
outputCurrency (string) - The output currency (BTC/ETH/USD)

Response:

{
"exchangeName": "BinanceService",
"outputAmount": 123.45
}
