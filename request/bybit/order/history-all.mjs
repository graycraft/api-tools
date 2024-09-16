/**
 * Bybit API order all endpoint.
 * 
 * @module request/bybit/order/all
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { warnOptional, warnRequired } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    PATH: {
      ORDER_HISTORY_ALL
    },
  } = config,
  {
    account: {
      category,
    },
    authentication: {
      sign
    },
    currency: {
      base,
      quote
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 */
const orderAll = (symbol, limit, {
  baseCoin, cursor, openOnly, orderFilter, orderId, orderLinkId, settleCoin
} = {}) => {
  const data = {
    // baseCoin,
    category,
    // cursor,
    // limit,
    // openOnly,
    // orderFilter,
    // orderId,
    // orderLinkId,
    // settleCoin,
    symbol: base + quote,
  };

  if (limit) {
    if (Number(limit))
      data.limit = limit
    else warnRequired(PATH, ORDER_HISTORY_ALL, "limit");
  }
  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_HISTORY_ALL, "symbol", data.symbol);
  }

  return bybitGet(sign, ORDER_HISTORY_ALL, data);
};

export default orderAll;
