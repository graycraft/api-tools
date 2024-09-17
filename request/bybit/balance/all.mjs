/**
 * Handle Bybit API balance all endpoint.
 * 
 * @module request/bybit/balance/all
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * `memberId` is UID.
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 */
const balanceAll = (accountType, memberId, {
  coin, withBonus
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { BALANCE_ALL } } = config,
    {
      account,
      account: { wallet },
      authentication: { sign },
    } = settings,
    defaults = {
      accountType: account.wallet,
      memberId: account[wallet]
    },
    data = bybitValidate(BALANCE_ALL, defaults,
      { warnOptional: { accountType, memberId } },
      { warnRequired: { withBonus } },
    );

  return bybitGet(sign, BALANCE_ALL, data)
}

export default balanceAll;
