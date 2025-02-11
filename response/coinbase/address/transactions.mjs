/**
 * Handle Coinbase Advanced API address transactions response operations.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/address/transactions
 */

import { obtainName } from '#lib/utility.mjs';
import { addressTransactions as schema } from '#res/coinbase/address/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const addressTransactions = (snapshot) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH,
      PATH: { ADDRESS_TRANSACTIONS },
    } = config,
    endpoint = obtainName(ADDRESS_TRANSACTIONS, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default addressTransactions;
