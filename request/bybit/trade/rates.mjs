/**
 * Bybit API trade history endpoint.
 * 
 * @module request/bybit/trade/history
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { warnOptional } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    CURRENCY,
    PATH: {
      TRADE_FEES
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
const tradeRates = (symbol, {
  baseCoin
} = {}) => {
  const data = {
    // baseCoin: base,
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

  if (symbol) {
    if (
      Object.values(CURRENCY.BASE).some(currency1 => 
        Object.values(CURRENCY.QUOTE).some(currency2 => currency1 + currency2 === symbol)
      )
    ) {
      data.symbol = symbol
    } else warnOptional(PATH, TRADE_FEES, "symbol", data.symbol);
  }

  return bybitGet(sign, TRADE_FEES, data)
};

export default tradeRates;
