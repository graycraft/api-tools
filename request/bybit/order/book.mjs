/**
 * Handle Bybit API order book depth request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
 * @typedef {import("#types/response/bybit/order/book.js").default} OrderBook
 * @module request/bybit/order/book
 */

import { orderBook as schema } from '#res/bybit/order/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} symbol Currency pair code (e.g. "ETHUSDC").
 * @param {string} category Product type.
 * @param {string} limit Limit for data size per page:
 *   - for `linear` or `inverse` -- default: 25, maximum 500;
 *   - for `option` -- default: 1, maximum 25;
 *   - for `spot` -- default: 1, maximum 200.
 * @returns {Promise<OrderBook>} JSON data from response.
 */
const orderBook = async (symbol, category, limit) => {
  const { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE, QUOTE },
      PATH: { ORDER_BOOK },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_BOOK, {
      defaults: {
        category: account.category,
        symbol: BASE.NAME + QUOTE.NAME,
      },
      optional: { category },
      required: { limit },
      throw: { symbol },
    }),
    json = await get(ORDER_BOOK, schema, security, data);

  return json;
};

export default orderBook;
