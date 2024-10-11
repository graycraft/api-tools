/**
 * Handle Bybit API market history endpoint, with recent public trading data.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
 * @typedef {import("#types/response/bybit/market/history.d.js").default} MarketHistory
 * @module request/bybit/market/history
 */

import { marketHistory as schema } from '#res/bybit/market/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} symbol Symbol name.
 * @param {string} limit Limit data per page (
 *   for spot product type default is 60, maximum 60;
 *   for other product types default is 500, maximum 1000
 * ).
 * @param {{ baseCoin?, category?, optionType? }} options
 * @returns {Promise<MarketHistory>} JSON data from response.
 */
const marketHistory = async (symbol, limit, { baseCoin, category, optionType } = {}) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { MARKET_HISTORY },
    } = config,
    {
      currency: { base, quote },
    } = prefs,
    { account } = settings,
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
