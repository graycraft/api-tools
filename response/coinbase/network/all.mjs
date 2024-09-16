/**
 * Handle Coinbase Advanced API network all endpoint.
 * 
 * @module response/coinbase/network/all
 */

import coinbaseAggregate from "../aggregate.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };

const {
    PATH: {
      NETWORK_ALL,
    }
  } = config;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const networkAll = () => coinbaseAggregate(NETWORK_ALL, "2024-08-17T16:53:20.580Z.json");

export default networkAll;
