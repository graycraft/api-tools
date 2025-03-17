/**
 * Handle Coinbase Advanced API request, listing all transactions of an account.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#list-transactions
 * @typedef {import("#types/response/coinbase/transaction/all.js").default} JTransactionAll
 * @module request/coinbase/transaction/all
 */

import { transactionAll as schema } from '#res/coinbase/transaction/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} [limit] Pagination limit (default: 25). Not described in documentation.
 * @returns {Promise<JTransactionAll>} JSON data from response.
 */
const transactionAll = async (account_uuid, limit) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { TRANSACTION_ALL },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(TRANSACTION_ALL, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      required: { limit },
    }),
    json = await get(TRANSACTION_ALL, schema, security, data);

  return json;
};

export default transactionAll;
