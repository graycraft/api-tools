/**
 * Bybit API order cancel one endpoint.
 * 
 * @module request/bybit/order/cancel_one
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { throwRequired, warnRequired } from "../../../lib/output.mjs";
import bybitPost from "../post.mjs";

const {
    PATH: {
      ORDER_CANCEL_ONE
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
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-order
 */
const orderCancelOne = (orderId, {
  orderFilter, orderLinkId, symbol
} = {}) => {
  const data = {
    category,
    // orderFilter,
    // orderId,
    // orderLinkId
    // symbol: base + quote,
  };

  if (Number(orderId))
    data.orderId = orderId
  else throwRequired(PATH, ORDER_CANCEL_ONE, "orderId");
  if (symbol) {
    if (typeof symbol === "string") {
      data.symbol = symbol
    } else warnRequired(PATH, ORDER_CANCEL_ONE, "symbol");
  }

  return bybitPost(sign, ORDER_CANCEL_ONE, data)
};

export default orderCancelOne;
