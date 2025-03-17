/**
 * Handle Coinbase Advanced API market request, with information about one currency pair (product) by its identifier.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproduct
 * @typedef {import("#types/response/coinbase/market/one.js").default} JMarketOne
 * @module request/coinbase/market/one
 */

import { marketOne as schema } from '#res/coinbase/market/schema.mjs';

import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id Currency pair (product) code (e.g. "ETH-USDC").
 * @returns {Promise<JMarketOne>} JSON data from response.
 */
const marketOne = async (product_id) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH: { MARKET_ONE },
      PRODUCT: { BASE, QUOTE },
    } = config,
    data = validate(MARKET_ONE, {
      defaults: {
        product_id: pair(BASE.CODE, QUOTE.CODE),
      },
      optional: { product_id },
    }),
    json = await get(MARKET_ONE, schema, null, data);

  return json;
};

export default marketOne;
