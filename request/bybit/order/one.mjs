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
      ORDER_ALL
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
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 */
const orderOne = (orderId, {
  baseCoin, cursor, openOnly, orderFilter, orderLinkId, settleCoin, symbol,
} = {}) => {
  const data = {
    // baseCoin,
    category,
    // cursor,
    // limit,
    openOnly: 2,
    // orderFilter,
    // orderId,
    // orderLinkId,
    // settleCoin,
    // symbol: base + quote,
  };

  if (Number(orderId))
    data.orderId = orderId
  else throwRequired(PATH, ORDER_ALL, "orderId");
  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_ALL, "symbol", data.symbol);
  }

  return bybitGet(sign, ORDER_ALL, data)
};

export default orderOne;
