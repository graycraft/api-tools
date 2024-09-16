/**
 * Handle Bybit API trade fee rates endpoint.
 * 
 * @module request/bybit/trade/rates
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/fee-rate
 */
const tradeRates = (symbol, {
  baseCoin, category
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { TRADE_RATES } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(TRADE_RATES, defaults,
      { warnOptional: { category } },
      { warnRequired: { baseCoin, symbol } },
    );

  return bybitGet(sign, TRADE_RATES, data)
};

export default tradeRates;
