/**
 * Handle Bybit API trade fee rates endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/fee-rate
 * @module request/bybit/trade/rates
 */

import { tradeRates as schema } from '#res/bybit/trade/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} symbol Symbol name.
 * @param {{ baseCoin?, category? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const tradeRates = async (symbol, { baseCoin, category } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRADE_RATES },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRADE_RATES, {
      defaults: {
        category: account.category,
      },
      optional: { category },
      required: { baseCoin, symbol },
    }),
    json = await get(TRADE_RATES, schema, security, data);

  return json;
};

export default tradeRates;
