/**
 * Handle Bybit API balance endpoint, with one entry by member identifier.
 * 
 * @module request/bybit/balance/one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 */
const balanceOne = (accountType, coin, memberId, {
  withBonus
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { BALANCE_ONE } } = config,
    {
      account,
      account: { wallet },
      authentication: { sign },
      currency: { base }
    } = settings,
    defaults = {
      accountType: account.wallet,
      coin: base,
      memberId: account[wallet]
    },
    data = bybitValidate(BALANCE_ONE, defaults,
      { warnOptional: { accountType, coin, memberId, } },
      { warnRequired: { withBonus } },
    );

  return bybitGet(sign, BALANCE_ONE, data)
}

export default balanceOne;
