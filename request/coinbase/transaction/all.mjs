/**
 * Handle Coinbase Advanced API endpoint, with transactions list of an account.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#list-transactions
 * @module request/coinbase/transaction/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { transactionAll as schema } from '../../../response/coinbase/transaction/schema.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} [limit] Pagination limit (default is 25). Not described in documentation.
 * @returns {Promise<{ data: [{ id: string }] }>}
 */
const transactionAll = async (account_uuid, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSACTION_ALL },
    } = config,
    {
      account: { uuid },
      authentication: { security },
    } = settings,
    data = validate(TRANSACTION_ALL, {
      defaults: {
        account_uuid: uuid,
      },
      optional: { account_uuid },
      required: { limit },
    }),
    json = await get(TRANSACTION_ALL, schema, security, data);

  return json;
};

export default transactionAll;
