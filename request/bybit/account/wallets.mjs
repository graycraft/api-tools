/**
 * Handle Bybit API account wallet types request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/user/wallet-type
 * @typedef {import("#types/response/bybit/account/wallets.d.js").default} AccountWallets
 * @module request/bybit/account/wallets
 */

import { accountWallets as schema } from '#res/bybit/account/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * "FUND" - never deposited or transfered capital. This wallet type absent in the array, but account has this wallet.
 * "CONTRACT", "FUND", "SPOT" - classic account and Funding wallet was operated before.
 * "CONTRACT", "FUND", "UNIFIED" - UTA account and Funding wallet was operated before.
 * "CONTRACT", "SPOT" - classic account and Funding wallet is never operated.
 * "CONTRACT", "UNIFIED" - UTA account and Funding wallet is never operated.
 * @param {string} memberIds Multiple sub UIDs can be supplied, separated by commas.
 * @returns {Promise<AccountWallets>} JSON data from response.
 */
const accountWallets = async (memberIds) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { ACCOUNT_WALLETS },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
    } = settings,
    data = validate(ACCOUNT_WALLETS, {
      defaults: {
        memberIds: [account[wallet]].join(),
      },
      optional: { memberIds },
    }),
    json = await get(ACCOUNT_WALLETS, schema, security, data);

  return json;
};

export default accountWallets;
