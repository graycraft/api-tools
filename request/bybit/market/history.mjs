/**
 * Handle Bybit API market history endpoint.
 * 
 * @module request/bybit/market/history
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";
import schema from "../../../response/bybit/schema/market/history.mjs";
import responseValidate from "../../../response/validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/recent-trade
 */
const marketHistory = async (symbol, limit, { baseCoin, category, optionType } = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { MARKET_HISTORY } } = config,
    {
      account,
      currency: {
        base,
        quote
      }
    } = settings,
    defaults = {
      category: account.category,
      symbol: base + quote,
    },
    data = bybitValidate(MARKET_HISTORY, defaults,
      { warnOptional: { category, symbol } },
      { warnRequired: { baseCoin, limit, optionType } },
    ),
    json = await bybitGet(null, MARKET_HISTORY, data),
    isValidJson = responseValidate(json, schema);

  return isValidJson
};

export default marketHistory;
