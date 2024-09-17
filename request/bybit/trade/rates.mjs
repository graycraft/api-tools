/**
 * Handle Bybit API trade fee rates endpoint.
 *
 * @module request/bybit/trade/rates
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { tradeRates as schema } from '../../../response/bybit/trade/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/fee-rate
 * @param {string} symbol
 * @param {{ baseCoin?, category? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const tradeRates = (symbol, { baseCoin, category } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRADE_RATES },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      TRADE_RATES,
      defaults,
      { warnOptional: { category } },
      { warnRequired: { baseCoin, symbol } },
    ),
    json = get(TRADE_RATES, schema, security, data);

  return json;
};

export default tradeRates;
