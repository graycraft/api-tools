/**
 * Handle Coinbase Advanced API request, with information about the last trades (ticks) and best ask/bid.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicmarkettrades
 * @typedef {import("#types/response/coinbase/market/tickers.js").default} JMarketTickers
 * @module request/coinbase/market/tickers
 */

import { marketTickers as schema } from '#res/coinbase/market/schema.mjs';

import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id Currency pair code (e.g. "ETH-USDC").
 * @param {string} [limit] Number of trades to be returned. Not required, despite what is stated in documentation.
 * @param {{ end?: string; start?: string; }} options Optional parameters.
 * @returns {Promise<JMarketTickers>} JSON data from response.
 */
const marketTickers = async (product_id, limit, { end, start } = {}) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH: { MARKET_TICKERS },
      PRODUCT: { BASE, QUOTE },
    } = config,
    data = validate(MARKET_TICKERS, {
      defaults: {
        product_id: pair(BASE.CODE, QUOTE.CODE),
      },
      optional: { product_id },
      required: { end, limit, start },
    }),
    json = await get(MARKET_TICKERS, schema, null, data);

  return json;
};

export default marketTickers;
