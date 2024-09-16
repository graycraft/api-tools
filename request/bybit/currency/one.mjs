/**
 * Handle Bybit API currency one endpoint.
 * 
 * @module request/bybit/currency/one
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      CURRENCY_ONE,
    },
  } = config,
  {
    authentication: {
      sign
    },
    currency: {
      base
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyOne = (coin) => {
  const defaults = {
    coin: base
  },
  data = validate(
    CURRENCY_ONE, isValid, defaults,
    { warnOptional: { coin } },
  )

  return bybitGet(sign, CURRENCY_ONE, data);
};

export default currencyOne;
