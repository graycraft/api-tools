/**
 * Handle Bybit API order book endpoint.
 * 
 * @module request/bybit/order/book
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
 */
const orderBook = (category, symbol, limit) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_BOOK } } = config,
    {
      account,
      currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      symbol: base + quote,
    },
    data = bybitValidate(ORDER_BOOK, defaults,
      { warnOptional: { category, symbol } },
      { warnRequired: { limit } },
    );

  return bybitGet(null, ORDER_BOOK, data);
};

export default orderBook;
