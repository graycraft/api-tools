/**
 * Handle Bybit API network all endpoint.
 * 
 * @module response/bybit/network/all
 */

import bybitAggregate from "../aggregate.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };

const {
    PATH: {
      NETWORK_ALL,
    }
  } = config;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const networkAll = () => bybitAggregate(NETWORK_ALL, "2024-08-17T16:53:20.580Z.json");

export default networkAll;
