/**
 * Bybit API order cancel all endpoint.
 * 
 * @module request/bybit/order/cancel-all
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { warnRequired } from "../../../lib/output.mjs";
import bybitPost from "../post.mjs";

const {
    PATH: {
      ORDER_CANCEL_ALL
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
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-all
 */
const orderCancelAll = (symbol, {
  baseCoin, orderFilter, settleCoin, stopOrderType
} = {}) => {
  const data = {
    // baseCoin,
    category,
    // orderFilter,
    // settleCoin,
    // stopOrderType,
    // symbol: base + quote,
  };

  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnRequired(PATH, ORDER_CANCEL_ALL, "symbol");
  }

  return bybitPost(sign, ORDER_CANCEL_ALL, data)
};

export default orderCancelAll;
