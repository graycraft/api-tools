/**
 * Handle Bybit API currency endpoint, with one entry by currency name.
 * 
 * @module request/bybit/currency/one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
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
    )

  return bybitGet(sign, CURRENCY_ONE, data);
};

export default currencyOne;
