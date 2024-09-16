/**
 * Handle Bybit API key information endpoint.
 * 
 * @module request/bybit/key/information
 */

import bybitGet from "../get.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/user/apikey-info
 */
const keyInformation = () => {
  const { config, settings } = global.apiTools,
    { PATH: { KEY_INFORMATION } } = config,
    { authentication: { sign } } = settings;

  return bybitGet(sign, KEY_INFORMATION);
};

export default keyInformation;
