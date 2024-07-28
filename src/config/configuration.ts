import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  BINANCE_BASE_URL: Joi.string().uri().required(),
  KUCOIN_BASE_URL: Joi.string().uri().required(),
  PORT: Joi.number().default(3000),
});
