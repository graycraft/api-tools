/**
 * Handle Bybit API market tickers endpoint, with latest price snapshot,
 * best bid/ask price and trading volume in the last 24 hours.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/tickers
 * @module request/bybit/market/tickers
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketTickers as schema } from '../../../response/bybit/market/schema.mjs';

/**
 * Parameter `limit` is not available for this endpoint.
 * For category `option`, `baseCoin` and `symbol` are required.
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} symbol Symbol name.
 * @param {{ baseCoin?, category?, expDate? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const marketTickers = async (symbol, { baseCoin, category, expDate } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_TICKERS },
    } = config,
    { account, currency } = settings,
    { base, quote } = currency,
    data = validate(MARKET_TICKERS, {
      defaults: {
        category: account.category,
        symbol: base + quote,
      },
      optional: { category, symbol },
      required: { baseCoin, expDate },
    }),
    json = await get(MARKET_TICKERS, schema, null, data);

  return json;
};

export default marketTickers;
