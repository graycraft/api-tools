/**
 * Handle Coinbase Advanced API order book depth request, listing asks/bids by currency pair (product) identifier.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproductbook
 * @typedef {import("#types/response/coinbase/order/book.d.js").default} OrderBook
 * @module request/coinbase/order/book
 */

import { orderBook as schema } from '#res/coinbase/order/schema.mjs';

import get from '../get.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * @param {string} product_id Currency pair code (e.g. "ETH-USDC").
 * @param {string} [limit] Pagination limit (maximum: 1000).
 * @param {string} [aggregation_price_increment] The minimum price intervals at which buy and sell orders are grouped or combined in the order book.
 * @returns {Promise<OrderBook>} JSON data from response.
 */
const orderBook = async (product_id, limit, aggregation_price_increment) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { ORDER_BOOK },
      PRODUCT: { BASE, QUOTE },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(ORDER_BOOK, {
      defaults: {
        product_id: pair(BASE.CODE, QUOTE.CODE),
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
