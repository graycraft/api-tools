/**
 * Handle Bybit API currency all endpoint.
 * 
 * @module response/bybit/currency/all
 */

import bybitAggregate from "../aggregate.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
const {
    PATH: {
      ADDRESS_ALL,
    }
  } = config;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyAll = () => bybitAggregate(ADDRESS_ALL, "2024-08-17T15:29:51.146Z.json");

export default currencyAll;
