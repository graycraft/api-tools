/**
 * Handle Bybit API account wallet types endpoint.
 * 
 * @module request/bybit/account/wallets
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * `memberId` is UID.
 * @see https://bybit-exchange.github.io/docs/v5/user/wallet-type
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 */
const accountWallets = (memberIds) => {
  const { config, settings } = global.apiTools,
    { PATH: { ACCOUNT_WALLETS } } = config,
    {
      account: { SPOT, UNIFIED },
      authentication: { sign },
    } = settings,
    defaults = {
      memberIds: [SPOT, UNIFIED].join()
    },
    data = bybitValidate(ACCOUNT_WALLETS, defaults,
      { warnOptional: { memberIds } },
    );

  return bybitGet(sign, ACCOUNT_WALLETS, data)
};

export default accountWallets;
