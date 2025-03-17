/**
 * Handle Coinbase Advanced API request, listing account's all withdraw entries.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#list-transactions
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/coinbase-app-travel-rule
 * @typedef {import("#types/response/coinbase/withdraw/all.js").default} JWithdrawAll
 * @module request/coinbase/withdraw/all
 */

import { withdrawAll as schema } from '#res/coinbase/withdraw/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * API key pair must have withdrawal permission?
 * @param {string} account_uuid Account UUID.
 * @param {string} [limit] Pagination limit (default: 25, maximum: 300). Not described in documentation.
 * @returns {Promise<JWithdrawAll>} JSON data from response.
 */
const withdrawAll = async (account_uuid, limit = '300') => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { WITHDRAW_ALL },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(WITHDRAW_ALL, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
        limit,
        type: 'send',
      },
      optional: { account_uuid },
    }),
    json = await get(WITHDRAW_ALL, schema, security, data);

  return json;
};

export default withdrawAll;
