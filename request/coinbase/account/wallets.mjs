/**
 * Handle Coinbase Advanced API account all endpoint.
 * 
 * @module request/coinbase/account/all
 */

import coinbaseGet from "../get.mjs";
import isValidParams from "../validate.mjs";
import validateParams from "../../validate.mjs";

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccounts
 */
const accountWallets = (retail_portfolio_id, limit, cursor) => {
  const { config, settings } = global.apiTools,
    { PATH: { ACCOUNT_WALLETS } } = config,
    {
      account,
      account: { wallet },
      authentication: { sign },
    } = settings,
    defaults = {
      // retail_portfolio_id: account[wallet],
    },
    data = validateParams(
      ACCOUNT_WALLETS, isValidParams, defaults,
      { warnRequired: { retail_portfolio_id } },
    );

  return coinbaseGet(sign, ACCOUNT_WALLETS, data)
}

export default accountWallets;
