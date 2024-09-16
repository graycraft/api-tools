/**
 * Handle Bybit API network all endpoint.
 * 
 * @module request/bybit/network/all
 */

import responseAggregate from "../aggregate.mjs";
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
const networkAll = () => responseAggregate(CURRENCY_ALL, "2024-08-17T15:29:51.146Z");

export default networkAll;
