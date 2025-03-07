/**
 * Handle Bybit API trade fee rates request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/account/fee-rate
 * @typedef {import("#types/response/bybit/trade/rates.d.js").default} TradeRates
 * @module request/bybit/trade/rates
 */

import { tradeRates as schema } from '#res/bybit/trade/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} symbol Currency pair code (e.g. "ETHUSDC").
 * @param {{ baseCoin?, category? }} options Optional parameters.
 * @returns {Promise<TradeRates>} JSON data from response.
 */
const tradeRates = async (symbol, { baseCoin, category } = {}) => {
  const { config, settings } = global.apiTools.bybit,
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
