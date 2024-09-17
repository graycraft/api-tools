/**
 * Handle Bybit API order book endpoint.
 *
 * @module request/bybit/order/book
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderBook as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
 * @param {string} category
 * @param {string} symbol
 * @param {string} limit
 * @returns {Promise<object>} JSON data from response.
 */
const orderBook = (category, symbol, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_BOOK },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base, quote },
    } = settings,
    defaults = {
      category: account.category,
      symbol: base + quote,
    },
    data = validate(
      ORDER_BOOK,
      defaults,
      { warnOptional: { category, symbol } },
      { warnRequired: { limit } },
    ),
    json = get(ORDER_BOOK, schema, security, data);

  return json;
};

export default orderBook;
