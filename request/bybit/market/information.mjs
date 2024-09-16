/**
 * Handle Bybit API market information endpoint.
 * 
 * @module request/bybit/market/information
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/instrument
 */
const marketInformation = (symbol, limit, { baseCoin, category, cursor, status } = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { MARKET_INFORMATION } } = config,
    {
      account,
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(MARKET_INFORMATION, defaults,
      { warnOptional: { baseCoin, category, cursor, status, symbol } },
      { warnRequired: { limit } },
    );
  
  return bybitGet(null, MARKET_INFORMATION, data)
};

export default marketInformation;
