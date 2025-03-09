/**
 * Handle Coinbase Advanced API request, listing transactions that have been done by account address UUID.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#list-transactions
 * @typedef {import('#types/response/coinbase/address/transactions.d.js').default} AddressTransactions
 * @module request/coinbase/address/transactions
 */

import { addressTransactions as schema } from '#res/coinbase/address/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} address_uuid Address UUID. Also regular cryptocurrency address can be used.
 * @param {string} [limit] Pagination limit (default: 25). Not described in documentation.
 * @param {string} [account_uuid] Account UUID.
 * @returns {Promise<AddressTransactions>} JSON data from response.
 */
const addressTransactions = async (address_uuid, limit, account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { ADDRESS_TRANSACTIONS },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(ADDRESS_TRANSACTIONS, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      optional: { account_uuid },
      required: { limit },
      throw: { address_uuid },
    }),
    json = await get(ADDRESS_TRANSACTIONS, schema, security, data);

  return json;
};

export default addressTransactions;
