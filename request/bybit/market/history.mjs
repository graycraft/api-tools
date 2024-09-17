/**
 * Handle Bybit API market history endpoint.
 *
 * @module request/bybit/market/history
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketHistory as schema } from '../../../response/bybit/market/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
 * @param {string} symbol
 * @param {string} limit
 * @param {{ baseCoin?, category?, optionType? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const marketHistory = (symbol, limit, { baseCoin, category, optionType } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_HISTORY },
    } = config,
    {
      account,
      currency: { base, quote },
    } = settings,
    defaults = {
      category: account.category,
      symbol: base + quote,
    },
    data = validate(
      MARKET_HISTORY,
      defaults,
      { warnOptional: { category, symbol } },
      { warnRequired: { baseCoin, limit, optionType } },
    ),
    json = get(MARKET_HISTORY, schema, null, data);

  return json;
};

export default marketHistory;
