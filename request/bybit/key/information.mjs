/**
 * Handle Bybit API key information endpoint.
 * 
 * @module request/bybit/key/information
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      KEY_INFORMATION
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/user/apikey-info
 */
const keyInformation = () => {
  return bybitGet(sign, KEY_INFORMATION);
};

export default keyInformation;
