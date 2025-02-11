/**
 * Handle Coinbase Advanced API address new response operations.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/address/new
 */

import { obtainName } from '#lib/utility.mjs';
import { addressNew as schema } from '#res/coinbase/address/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const addressNew = (snapshot) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH,
      PATH: { ADDRESS_NEW },
    } = config,
    endpoint = obtainName(ADDRESS_NEW, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default addressNew;
