/**
 * Handle Coinbase Advanced API account wallets endpoint.
 *
 * @module request/coinbase/account/wallets
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * `memberId` is UID.
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfolios
 */
const accountAll = (memberIds) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ACCOUNT_ALL },
    } = config,
    {
      authentication: { sign },
    } = settings,
    defaults = {},
    data = validateParams(ACCOUNT_ALL, isValidParams, defaults, {
      warnRequired: { memberIds },
    });

  return coinbaseGet(sign, ACCOUNT_ALL, data);
};

export default accountAll;
