/**
 * Handle Coinbase Advanced API market tickers endpoint.
 * 
 * @module request/coinbase/market/tickers
 */

import coinbaseGet from "../get.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/coinbase.json" with { type: "json" };

const {
    PATH: {
      MARKET_TICKERS,
    }
  } = config,
  {
    currency: {
      base,
      quote
    }
  } = settings;

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicmarkettrades
 */
const marketTickers = (product_id, limit, { end, start } = {}) => {
  const defaults = {
      product_id: base + quote,
    },
    data = validate(
      MARKET_TICKERS, isValid, defaults,
      { warnOptional: { product_id } },
      { warnRequired: { limit } },
    );

  return coinbaseGet(null, MARKET_TICKERS, data)
};

export default marketTickers;
