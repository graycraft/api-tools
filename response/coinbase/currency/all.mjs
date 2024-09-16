/**
 * Handle Coinbase Advanced API currency all endpoint.
 * 
 * @module response/coinbase/currency/all
 */

import coinbaseAggregate from "../aggregate.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };

const {
    PATH: {
      CURRENCY_ALL,
    }
  } = config;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyAll = () => coinbaseAggregate(CURRENCY_ALL, "2024-08-20T19:36:12.998Z.json");

export default currencyAll;
