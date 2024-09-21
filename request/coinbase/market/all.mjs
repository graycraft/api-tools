/**
 * Coinbase Advanced API endpoint, with all available currency pairs (products) for trading.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproducts
 * @module request/coinbase/market/information
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketAll as schema } from '../../../response/coinbase/market/schema.mjs';

/**
 * @param {string} product_ids List of trading pairs (e.g. "BTC-USD").
 * @param {string} limit Pagination limit.
 * @param {{ contract_expiry_type?, expiring_contract_status?, get_all_products?, offset?, product_type? }} rest
 * @returns {Promise<{ products: [{ product_id: string }] }>}
 */
const marketAll = (
  product_ids,
  limit,
  { contract_expiry_type, expiring_contract_status, get_all_products, offset, product_type } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_ALL },
      PRODUCT,
    } = config,
    {
      authentication: { security },
      currency: { base, quote },
    } = settings,
    data = validate(MARKET_ALL, {
      defaults: {
        /** @todo Pass array ?product_ids=BTC-USDT&product_ids=ETH-USDT instead of ?product_ids=ETH-USDT%2CBTC-USDT. */
        product_ids: [base + '-' + quote /* , "BTC-USDT" */],
        product_type: PRODUCT.SPOT,
      },
      optional: { product_ids },
      required: { limit },
    }),
    json = get(MARKET_ALL, schema, security, data);

  return json;
};

export default marketAll;
