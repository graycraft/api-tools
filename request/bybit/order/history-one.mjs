/**
 * Bybit API order all endpoint.
 * 
 * @module request/bybit/order/all
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { throwRequired, warnOptional } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    PATH: {
      ORDER_HISTORY_ONE
    },
  } = config,
  {
    account: {
      category,
    },
    authentication: {
      sign
    },
    /* currency: {
      base,
      quote
    } */
  } = settings;;

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 */
const orderOne = (orderId, symbol, {
  baseCoin, cursor, openOnly, orderFilter, orderLinkId, settleCoin
} = {}) => {
  const data = {
    // baseCoin,
    category,
    // cursor,
    // limit,
    // openOnly: 2,
    // orderFilter,
    // orderId,
    // orderLinkId,
    // settleCoin,
    // symbol: base + quote,
  };

  if (Number(orderId))
    data.orderId = orderId
  else throwRequired(PATH, ORDER_HISTORY_ONE, "orderId");
  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_HISTORY_ONE, "symbol", data.symbol);
  }

  return bybitGet(sign, ORDER_HISTORY_ONE, data)
};

export default orderOne;
