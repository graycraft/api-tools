/**
 * Handle Coinbase Advanced API endpoint with product candles.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getcandles
 * @typedef {import("#types/response/coinbase/product/candles.d.js").default} ProductCandles
 * @module request/coinbase/product/candles
 */

import { productCandles as schema } from '#res/coinbase/product/schema.mjs';
import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id Trading pair (e.g. "BTC-USD").
 * @param {string} start The unix timestamp indicating the start of the time interval.
 * @param {string} end The unix timestamp indicating the end of the time interval.
 * @param {"FIFTEEN_MINUTE" | "FIVE_MINUTE" | "ONE_DAY" | "ONE_HOUR" | "ONE_MINUTE" | "SIX_HOUR" | "THIRTY_MINUTE" |
 *   "TWO_HOUR" | "UNKNOWN_GRANULARITY"} granularity The time frame each candle represents.
 * @param {{ limit?: string }} options Optional parameters.
 * @returns {Promise<ProductCandles>} JSON data from response.
 */
const productCandles = async (product_id, start, end, granularity, { limit } = {}) => {
  const { timestamp } = global.apiTools,
    { config, settings } = global.apiTools.coinbase,
    {
      PATH: { PRODUCT_CANDLES },
    } = config,
    {
      asset: { base, quote },
      authentication: { security },
    } = settings,
    data = validate(PRODUCT_CANDLES, {
      defaults: {
        end: String(Math.round(timestamp / 1_000)),
        granularity: 'THIRTY_MINUTE',
        product_id: pair(base.code, quote.code),
        start: String(Math.round(timestamp / 1_000) - 60 * 60),
      },
      optional: { end, granularity, product_id, start },
      required: { limit: '100' },
    }),
    json = await get(PRODUCT_CANDLES, schema, security, data);

  return json;
};

export default productCandles;
