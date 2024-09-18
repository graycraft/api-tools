/**
 * Handle Bybit API account wallet types endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/user/wallet-type
 * @module request/bybit/account/wallets
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { accountWallets as schema } from '../../../response/bybit/account/schema.mjs';

/**
 * "FUND" - never deposited or transfered capital. This wallet type absent in the array, but account has this wallet.
 * "CONTRACT", "FUND", "SPOT" - classic account and Funding wallet was operated before.
 * "CONTRACT", "FUND", "UNIFIED" - UTA account and Funding wallet was operated before.
 * "CONTRACT", "SPOT" - classic account and Funding wallet is never operated.
 * "CONTRACT", "UNIFIED" - UTA account and Funding wallet is never operated.
 * @param {string} memberIds Multiple sub UIDs can be supplied, separated by commas.
 * @returns {Promise<Object>} JSON data from response.
 */
const accountWallets = async (memberIds) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ACCOUNT_WALLETS },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
    } = settings,
    defaults = {
      memberIds: [account[wallet]].join(),
    },
    data = validate(ACCOUNT_WALLETS, defaults, {
      warnOptional: { memberIds },
    }),
    json = await get(ACCOUNT_WALLETS, schema, security, data);

  return json;
};

export default accountWallets;
