/**
 * Handle Bybit API market history endpoint, with recent public trading data.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
 * @module request/bybit/market/history
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketHistory as schema } from '../../../response/bybit/market/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} symbol Symbol name.
 * @param {string} limit Limit data per page (
 *   for spot product type default is 60, maximum 60;
 *   for other product types default is 500, maximum 1000
 * ).
 * @param {{ baseCoin?, category?, optionType? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const marketHistory = async (symbol, limit, { baseCoin, category, optionType } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_HISTORY },
    } = config,
    {
      account,
      currency: { base, quote },
    } = settings,
    data = validate(MARKET_HISTORY, {
      defaults: {
        category: account.category,
        symbol: base + quote,
      },
      optional: { category, symbol },
      required: { baseCoin, limit, optionType },
    }),
    json = await get(MARKET_HISTORY, schema, null, data);

  return json;
};

export default marketHistory;
