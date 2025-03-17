/**
 * Handle Bybit API market tickers request, with latest price data,
 * best ask/bid price and trading volume in the last 24 hours.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/tickers
 * @typedef {import("#types/response/bybit/market/tickers.js").default} JMarketTickers
 * @module request/bybit/market/tickers
 */

import { marketTickers as schema } from '#res/bybit/market/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Parameter `limit` is not available for this endpoint.
 * For category `option`, parameters `baseCoin` and `symbol` are required.
 * @param {string} symbol Currency pair code (e.g. "ETHUSDC").
 * @param {{ baseCoin?: string; category?: string; expDate?: string; }} options Optional parameters.
 * @returns {Promise<JMarketTickers>} JSON data from response.
 */
const marketTickers = async (symbol, { baseCoin, category, expDate } = {}) => {
  const { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE, QUOTE },
      PATH: { MARKET_TICKERS },
    } = config,
    { account } = settings,
    data = validate(MARKET_TICKERS, {
      defaults: {
        category: account.category,
        symbol: BASE.NAME + QUOTE.NAME,
      },
      optional: { category, symbol },
      required: { baseCoin, expDate },
    }),
    json = await get(MARKET_TICKERS, schema, null, data);

  return json;
};

export default marketTickers;
