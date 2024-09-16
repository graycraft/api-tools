/**
 * Handle Coinbase Advanced API account wallet balance endpoint.
 * 
 * @module request/coinbase/account/balance_wallet
 */

import coinbaseGet from "../get.mjs";
import config from "../../../configuration/coinbase.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../validate.mjs";
import settings from "../../../settings/coinbase.json" with { type: "json" };

const {
    PATH: {
      ACCOUNT_BALANCE,
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
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfoliobreakdown
 */
const accountBalanceWallet = (asset, portfolio_uuid) => {
  const defaults = {
      currency: "ETH",
      portfolio_uuid: account[wallet],
    },
    data = validate(
      ACCOUNT_BALANCE, isValid, defaults,
      { warnRequired: { portfolio_uuid } },
    );

  return coinbaseGet(sign, ACCOUNT_BALANCE, data, { asset })
}

export default accountBalanceWallet;
