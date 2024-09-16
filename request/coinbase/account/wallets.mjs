/**
 * Handle Coinbase Advanced API account all endpoint.
 * 
 * @module request/coinbase/account/all
 */

import coinbaseGet from "../get.mjs";
import isValid from "../validate.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import settings from "../../../settings/coinbase.json" with { type: "json" };

const {
    PATH: {
      ACCOUNT_WALLETS,
    },
  } = config,
  {
    account,
    account: {
      wallet
    },
    authentication: {
      sign
    },
    /* currency: {
      base
    } */
  } = settings;

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccounts
 */
const accountWallets = (retail_portfolio_id, limit, cursor) => {
  const defaults = {
      //retail_portfolio_id: account[wallet],
    },
    data = validate(
      ACCOUNT_WALLETS, isValid, defaults,
      { warnRequired: { retail_portfolio_id } },
    );

  return coinbaseGet(sign, ACCOUNT_WALLETS, data)
}

export default accountWallets;
