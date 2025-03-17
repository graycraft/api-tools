/**
 * Handle Bybit API market history request, with recent public trading data.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
 * @typedef {import("#types/response/bybit/market/history.js").default} JMarketHistory
 * @module request/bybit/market/history
 */

import { marketHistory as schema } from '#res/bybit/market/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} symbol Currency pair code (e.g. "ETHUSDC").
 * @param {string} limit Limit data per page:
 *   - for spot product type -- default: 60, maximum: 60;
 *   - for other product types -- default: 500, maximum: 1000.
 * @param {{ baseCoin?: string; category?: string; optionType?: string; }} options Optional parameters.
 * @returns {Promise<JMarketHistory>} JSON data from response.
 */
const marketHistory = async (symbol, limit, { baseCoin, category, optionType } = {}) => {
  const { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE, QUOTE },
      PATH: { MARKET_HISTORY },
    } = config,
    { account } = settings,
    data = validate(MARKET_HISTORY, {
      defaults: {
        category: account.category,
        symbol: BASE.NAME + QUOTE.NAME,
      },
      optional: { category, symbol },
      required: { baseCoin, limit, optionType },
    }),
    json = await get(MARKET_HISTORY, schema, null, data);

  return json;
};

export default marketHistory;
