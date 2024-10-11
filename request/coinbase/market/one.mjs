/**
 * Handle Coinbase Advanced API market endpoint, with information about single product by its identifier.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproduct
 * @typedef {import("#types/response/coinbase/market/one.d.js").default} MarketOne
 * @module request/coinbase/market/one
 */

import { marketOne as schema } from '#res/coinbase/market/schema.mjs';
import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id Trading pair (e.g. "BTC-USD").
 * @returns {Promise<MarketOne>} JSON data from response.
 */
const marketOne = async (product_id) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { MARKET_ONE },
    } = config,
    {
      asset: { base, quote },
    } = settings,
    data = validate(MARKET_ONE, {
      defaults: {
        product_id: pair(base.code, quote.code),
      },
      optional: { product_id },
    }),
    json = await get(MARKET_ONE, schema, null, data);

  return json;
};

export default marketOne;
