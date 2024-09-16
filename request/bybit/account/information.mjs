/**
 * Handle Bybit API endpoint, with margin mode and upgraded status information of an account.
 * 
 * @module request/bybit/account/information
 */

import bybitGet from "../get.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/account-info
 */
const accountInformation = () => {
  const { config, settings } = global.apiTools,
    { PATH: { ACCOUNT_INFORMATION } } = config,
    { authentication: { sign } } = settings;

  return bybitGet(sign, ACCOUNT_INFORMATION)
};

export default accountInformation;
