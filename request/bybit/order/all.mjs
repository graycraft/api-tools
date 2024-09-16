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
      ORDER_ALL
    },
    TRADE,
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
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 */
const orderAll = (symbol, side, limit, {
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
    else warnRequired(PATH, ORDER_ALL, "limit");
  }
  if (side) {
    if (Object.values(TRADE).some(trade => trade === side))
      data.side = side
    else warnOptional(PATH, ORDER_ALL, "side", data.side);
  }
  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_ALL, "symbol", data.symbol);
  }

  return bybitGet(sign, ORDER_ALL, data);
};

export default orderAll;
