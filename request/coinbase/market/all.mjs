/**
 * Handle Coinbase Advanced API endpoint, listing all products available for trading.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproducts
 * @typedef {import("#types/response/coinbase/market/all.d.js").default} MarketAll
 * @module request/coinbase/market/all
 */

import { marketAll as schema } from '#res/coinbase/market/schema.mjs';
import get from '../get.mjs';
import validate, { pairs } from '../validate.mjs';

/**
 * @param {string} limit Pagination limit (default > 668, maximum unknown).
 * @param {{
 *   contract_expiry_type?, expiring_contract_status?, get_all_products?,
 *   offset?, product_ids?, product_type?
 * }} options Optional parameters.
 * @returns {Promise<MarketAll>} JSON data from response.
 */
const marketAll = async (
  limit,
  {
    contract_expiry_type,
    expiring_contract_status,
    get_all_products,
    offset,
    product_ids,
    product_type,
  } = {},
) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH: { MARKET_ALL },
      PRODUCT,
    } = config,
    data = validate(MARKET_ALL, {
      defaults: {
        product_type: PRODUCT.SPOT,
      },
      optional: { product_type },
      required: {
        contract_expiry_type,
        expiring_contract_status,
        get_all_products,
        limit,
        offset,
        product_ids: pairs(product_ids),
      },
    }),
    json = await get(MARKET_ALL, schema, null, data);

  return json;
};

export default marketAll;
