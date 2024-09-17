/**
 * Handle Coinbase Advanced API account wallet balance endpoint.
 *
 * @module request/coinbase/account/balance_wallet
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfoliobreakdown
 */
const accountBalanceWallet = (asset, portfolio_id) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ACCOUNT_BALANCE },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { sign },
    } = settings,
    defaults = {
      currency: 'ETH',
      portfolio_id: account[wallet],
    },
    data = validateParams(ACCOUNT_BALANCE, isValidParams, defaults, {
      warnRequired: { portfolio_id },
    });

  return coinbaseGet(sign, ACCOUNT_BALANCE, data, { asset });
};

export default accountBalanceWallet;
