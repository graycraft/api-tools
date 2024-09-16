/**
 * Bybit API market history endpoint.
 * 
 * @module request/bybit/market/history
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      MARKET_HISTORY,
    },
  } = config,
  {
    account,
    currency: {
      base,
      quote
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
 */
const marketHistory = (symbol, limit, { baseCoin, category, optionType } = {}) => {
  const defaults = {
      category: account.category,
      symbol: base + quote,
    },
    data = validate(
      MARKET_HISTORY, isValid, defaults,
      { warnOptional: { category, symbol } },
      { warnRequired: { limit } },
    );

  return bybitGet(null, MARKET_HISTORY, data)
};

export default marketHistory;
