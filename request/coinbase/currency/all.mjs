/**
 * Handle Coinbase Advanced API currency all endpoint.
 * 
 * @module request/coinbase/currency/all
 */

import coinbaseGet from "../get.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import settings from "../../../settings/coinbase.json" with { type: "json" };

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
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 */
const currencyAll = () => coinbaseGet(sign, CURRENCY_ALL);

export default currencyAll;
