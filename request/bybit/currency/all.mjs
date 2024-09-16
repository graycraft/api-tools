/**
 * Handle Bybit API currency all endpoint.
 * 
 * @module request/bybit/currency/all
 */

import bybitGet from "../get.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyAll = () => {
  const { config, settings } = global.apiTools,
    { PATH: { CURRENCY_ALL } } = config,
    { authentication: { sign } } = settings;

  return bybitGet(sign, CURRENCY_ALL)
};

export default currencyAll;
