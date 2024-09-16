/**
 * Handle Bybit API currency all endpoint.
 * 
 * @module request/bybit/currency/all
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      CURRENCY_ALL,
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
const currencyAll = () => bybitGet(sign, CURRENCY_ALL);

export default currencyAll;
