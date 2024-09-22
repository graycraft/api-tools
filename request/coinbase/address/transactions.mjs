/**
 * Handle Coinbase Advanced API endpoint, with list transactions that have been sent.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-transactions
 * @module request/coinbase/address/transactions
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { addressTransactions as schema } from '../../../response/coinbase/address/schema.mjs';

/**
 * @param {string} address_uuid Address UUID. Also regular cryptocurrency address can be used.
 * @param {string} [account_uuid] Account UUID.
 * @param {string} [limit] Pagination limit (default is 25). Not described in documentation.
 * @returns {Promise<{ data: { id :string } }>}
 */
const addressTransactions = async (address_uuid, account_uuid, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ADDRESS_TRANSACTIONS },
    } = config,
    {
      account: { uuid },
      authentication: { security },
    } = settings,
    data = validate(ADDRESS_TRANSACTIONS, {
      defaults: {
        account_uuid: uuid,
      },
      optional: { account_uuid },
      required: { address_uuid, limit },
    }),
    json = await get(ADDRESS_TRANSACTIONS, schema, security, data);

  return json;
};

export default addressTransactions;
