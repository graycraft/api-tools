/**
 * Handle Bybit API market tickers endpoint, with latest price snapshot,
 * best bid/ask price and trading volume in the last 24 hours.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/tickers
 * @typedef {import("#types/response/bybit/market/tickers.d.js").default} MarketTickers
 * @module request/bybit/market/tickers
 */

import { marketTickers as schema } from '#res/bybit/market/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Parameter `limit` is not available for this endpoint.
 * For category `option`, parameters `baseCoin` and `symbol` are required.
 * @param {string} symbol Symbol name.
 * @param {{ baseCoin?, category?, expDate? }} options Optional parameters.
 * @returns {Promise<MarketTickers>} JSON data from response.
 */
const marketTickers = async (symbol, { baseCoin, category, expDate } = {}) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { MARKET_TICKERS },
    } = config,
    {
      currency: { base, quote },
    } = prefs,
    { account } = settings,
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
