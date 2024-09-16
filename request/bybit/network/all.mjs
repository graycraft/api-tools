/**
 * Handle Bybit API network all endpoint.
 * 
 * @module request/bybit/network/all
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      NETWORK_ALL,
    }
  } = config,
  {
    authentication: {
      sign
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const networkAll = () => bybitGet(sign, NETWORK_ALL);

export default networkAll;
