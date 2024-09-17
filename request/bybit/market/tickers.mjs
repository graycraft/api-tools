/**
 * Handle Bybit API market tickers endpoint.
 *
 * @module request/bybit/market/tickers
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketTickers as schema } from '../../../response/bybit/market/schema.mjs';

/**
 * Note: limit is not available for this endpoint.
 * @see https://bybit-exchange.github.io/docs/v5/market/tickers
 * @param {string} symbol
 * @param {{ baseCoin?, category?, expDate? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const marketTickers = (symbol, { baseCoin, category, expDate } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_TICKERS },
    } = config,
    { account } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      MARKET_TICKERS,
      defaults,
      { warnOptional: { category } },
      { warnRequired: { baseCoin, expDate, symbol } },
    ),
    json = get(MARKET_TICKERS, schema, null, data);

  return json;
};

export default marketTickers;
