/**
 * Bybit API order book endpoint.
 * 
 * @module request/bybit/order/book
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { warnRequired } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    PATH: {
      ORDER_BOOK
    },
  } = config,
  {
    account: {
      category,
    },
    currency: {
      base,
      quote
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/orderbook
 */
const orderBook = (symbol, limit) => {
  const data = {
    category,
    // limit,
    symbol: base + quote
  };

  if (limit) {
    if (Number(limit))
      data.limit = limit
    else warnRequired(PATH, ORDER_BOOK, "limit");
  }
  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_BOOK, "symbol", data.symbol);
  }

  return bybitGet(null, ORDER_BOOK, data);
};

export default orderBook;
