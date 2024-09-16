/**
 * Handle Coinbase Advanced API account wallets endpoint.
 * 
 * @module request/coinbase/account/wallets
 */

import coinbaseGet from "../get.mjs";
import isValid from "../validate.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import settings from "../../../settings/coinbase.json" with { type: "json" };

const {
    PATH: {
      ACCOUNT_ALL,
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfolios
 */
const accountAll = (memberIds) => {
  const defaults = {},
    data = validate(
      ACCOUNT_ALL, isValid, defaults,
      { warnRequired: { memberIds } },
    );

  return coinbaseGet(sign, ACCOUNT_ALL, data)
};

export default accountAll;
