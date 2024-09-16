/**
 * Handle Bybit API account information endpoint.
 * 
 * @module request/bybit/account/information
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      ACCOUNT_INFORMATION,
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/account-info
 */
const accountInformation = () => {
  return bybitGet(sign, ACCOUNT_INFORMATION)
};

export default accountInformation;
