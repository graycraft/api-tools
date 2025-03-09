/**
 * Handle Coinbase Advanced API one account transaction request, by transaction UUID.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#list-transactions
 * @typedef {import("#types/response/coinbase/transaction/one.d.js").default} TransactionOne
 * @module request/coinbase/transaction/one
 */

import { transactionOne as schema } from '#res/coinbase/transaction/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} transaction_uuid Transaction UUID.
 * @param {string} [limit] Pagination limit (default: 25). Not described in documentation.
 * @returns {Promise<TransactionOne>} JSON data from response.
 */
const transactionOne = async (account_uuid, transaction_uuid, limit) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { TRANSACTION_ONE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(TRANSACTION_ONE, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      required: { limit },
      throw: { transaction_uuid },
    }),
    json = await get(TRANSACTION_ONE, schema, security, data);

  return json;
};

export default transactionOne;
