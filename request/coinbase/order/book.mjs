/**
 * Handle Coinbase Advanced API order book depth endpoint, listing bids/asks by product identifier.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproductbook
 * @module request/coinbase/order/book
 */

import { orderBook as schema } from '#res/coinbase/order/schema.mjs';
import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id The trading pair (e.g. "BTC-USD").
 * @param {string} [limit] Pagination limit (default: no, maximum: 1000).
 * @param {string} [aggregation_price_increment] The minimum price intervals at which buy and sell orders are grouped or combined in the order book.
 * @returns {Promise<{ pricebook: [{ product_id: string }] }>} JSON data from response.
 */
const orderBook = async (product_id, limit, aggregation_price_increment) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_BOOK },
    } = config,
    {
      authentication: { security },
      asset: { base, quote },
    } = settings,
    data = validate(ORDER_BOOK, {
      defaults: {
        product_id: pair(base.code, quote.code),
      },
      optional: { product_id },
      required: {
        aggregation_price_increment,
        limit,
      },
    }),
    json = await get(ORDER_BOOK, schema, security, data);

  return json;
};

export default orderBook;
