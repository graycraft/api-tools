/**
 * Handle Bybit API order book depth endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
 * @module request/bybit/order/book
 */

import { orderBook as schema } from '#res/bybit/order/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} symbol Symbol name is required by API.
 * @param {string} category Product type.
 * @param {string} limit Limit for data size per page (
 *   for `linear` or `inverse` default is 25, maximum 500;
 *   for `option` default is 1, maximum 25;
 *   for `spot` default is 1, maximum 200
 * ).
 * @returns {Promise<object>} JSON data from response.
 */
const orderBook = async (symbol, category, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_BOOK },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base, quote },
    } = settings,
    data = validate(ORDER_BOOK, {
      defaults: {
        category: account.category,
        symbol: base + quote,
      },
      optional: { category },
      required: { limit },
      throw: { symbol },
    }),
    json = await get(ORDER_BOOK, schema, security, data);

  return json;
};

export default orderBook;
