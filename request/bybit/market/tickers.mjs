/**
 * Handle Bybit API market tickers endpoint.
 * 
 * @module request/bybit/market/tickers
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * Note: limit is not available for this endpoint.
 * @see https://bybit-exchange.github.io/docs/v5/market/tickers
 */
const marketTickers = (symbol, { category, baseCoin, expDate } = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { MARKET_TICKERS } } = config,
    {
      account,
      /* currency: {
        base,
        quote
      } */
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(MARKET_TICKERS, defaults,
      { warnOptional: { category } },
      { warnRequired: { baseCoin, expDate, symbol } },
    );

  return bybitGet(null, MARKET_TICKERS, data)
};

export default marketTickers;
