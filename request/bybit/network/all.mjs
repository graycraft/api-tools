/**
 * Handle Bybit API network all endpoint.
 * 
 * @module request/bybit/network/all
 */

import bybitGet from "../get.mjs";

/**
 * Note: uses the same endpoint as currency all.
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const networkAll = (coin) => {
  const { config, settings } = global.apiTools,
    { PATH: { CURRENCY_ALL } } = config,
    { authentication: { sign } } = settings;

  return bybitGet(sign, CURRENCY_ALL)
};

export default networkAll;
