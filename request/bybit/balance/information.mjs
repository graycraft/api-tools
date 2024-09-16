/**
 * Handle Bybit API balance endpoint, with asset and risk rate information of each currency.
 * 
 * @module request/bybit/account/balance_rate
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/wallet-balance
 */
const balanceInformation = (accountType, coin) => {
  const { config, settings } = global.apiTools,
  { PATH: { BALANCE_INFORMATION } } = config,
  {
    account,
    authentication: { sign },
  } = settings,
  defaults = {
    accountType: account.wallet,
  },
  data = bybitValidate(BALANCE_INFORMATION, defaults,
    { warnOptional: { accountType } },
    { warnRequired: { coin } },
  );

  return bybitGet(sign, BALANCE_INFORMATION, data)
}

export default balanceInformation;
