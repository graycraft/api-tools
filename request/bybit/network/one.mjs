/**
 * Handle Bybit API network one endpoint.
 * 
 * @module request/bybit/network/one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * Note: uses the same endpoint as currency one.
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyOne = (coin) => {
  const { config, settings } = global.apiTools,
    { PATH: { CURRENCY_ONE } } = config,
    {
      authentication: { sign },
      currency: { base }
    } = settings,
    defaults = {
      coin: base
    },
    data = bybitValidate(CURRENCY_ONE, defaults,
      { warnOptional: { coin } },
    );

  return bybitGet(sign, CURRENCY_ONE, data);
};

export default currencyOne;
