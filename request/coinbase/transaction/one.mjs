/**
 * Handle Coinbase Advanced API endpoint, with one transactions of an account.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#list-transactions
 * @module request/coinbase/transaction/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { transactionOne as schema } from '../../../response/coinbase/transaction/schema.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @param {string} transaction_uuid Transaction UUID.
 * @param {string} [limit] Pagination limit (default is 25). Not described in documentation.
 * @returns {Promise<{ data: [{ id: string }] }>}
 */
const transactionOne = async (account_uuid, transaction_uuid, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRANSACTION_ONE },
    } = config,
    {
      account: { uuid },
      authentication: { security },
    } = settings,
    data = validate(TRANSACTION_ONE, {
      defaults: {
        account_uuid: uuid,
      },
      optional: { account_uuid },
      required: { limit },
      throw: { transaction_uuid },
    }),
    json = await get(TRANSACTION_ONE, schema, security, data);

  return json;
};

export default transactionOne;
