/**
 * Handle Coinbase Advanced API endpoint, with information about the last trades (ticks) and best bid/ask.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicmarkettrades
 * @typedef {import("#types/response/coinbase/market/tickers.d.js").default} MarketTickers
 * @module request/coinbase/market/tickers
 */

import { marketTickers as schema } from '#res/coinbase/market/schema.mjs';
import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id Trading pair (e.g. "BTC-USD").
 * @param {string} [limit] Number of trades to be returned. Not required, despite what is stated in documentation.
 * @param {{ end?, start? }} options Optional parameters.
 * @returns {Promise<MarketTickers>} JSON data from response.
 */
const marketTickers = async (product_id, limit, { end, start } = {}) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { MARKET_TICKERS },
    } = config,
    {
      asset: { base, quote },
    } = settings,
    data = validate(MARKET_TICKERS, {
      defaults: {
        product_id: pair(base.code, quote.code),
      },
      optional: { product_id },
      required: { end, limit, start },
    }),
    json = await get(MARKET_TICKERS, schema, null, data);

  return json;
};

export default marketTickers;
