/**
 * Bybit API market tickers endpoint.
 * 
 * @module request/bybit/market/tickers
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { warnOptional } from "../../../lib/output.mjs";
import bybitGet from "../get.mjs";

const {
    PATH: {
      MARKET_TICKERS,
    }
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
 * @see https://bybit-exchange.github.io/docs/v5/market/tickers
 */
const marketTickers = (symbol) => {
  const data = {
    // baseCoin
    category,
    // expDate,
    symbol: base + quote,
  };

  if (symbol) {
    if (typeof symbol === "string")
      data.symbol = symbol
    else warnOptional(PATH, MARKET_TICKERS, "symbol", data.symbol)
  };

  return bybitGet(null, MARKET_TICKERS, data)
};

export default marketTickers;
