/**
 * Bybit API trade history endpoint.
 * 
 * @module request/bybit/trade/history
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { warnOptional, warnRequired, throwRequired } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    PATH: {
      TRADE_HISTORY_ONE
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
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 */
const tradeHistory = (orderId, side, symbol, limit, {
  baseCoin, cursor, endTime, execType, orderLinkId, startTime
} = {}) => {
  const data = {
    // baseCoin,
    // cursor,
    category,
    // endTime,
    // execType,
    // limit,
    // orderId,
    // orderLinkId,
    // startTime,
    symbol: base + quote,
  };

  if (Number(orderId))
    data.orderId = orderId
  else throwRequired(PATH, TRADE_HISTORY_ONE, "orderId");
  if (limit) {
    if (Number(limit))
      data.limit = limit
    else warnRequired(PATH, TRADE_HISTORY_ONE, "limit");
  }
  if (side) {
    if (Object.values(TRADE).some(trade => trade === side))
      data.side = side
    else warnOptional(PATH, TRADE_HISTORY_ONE, "side", data.side);
  }
  if (symbol) {
    if (
      Object.values(CURRENCY.BASE).some(currency1 => 
        Object.values(CURRENCY.QUOTE).some(currency2 => currency1 + currency2 === symbol)
      )
    ) {
      data.symbol = symbol
    } else warnOptional(PATH, TRADE_HISTORY_ONE, "symbol", data.symbol);
  }

  return bybitGet(sign, TRADE_HISTORY_ONE, data)
};

export default tradeHistory;
