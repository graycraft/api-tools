/**
 * Handle Coinbase Advanced API address all response operations.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/address/all
 */

import { obtain } from '#lib/utility.mjs';
import { addressAll as schema } from '#res/coinbase/address/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const addressAll = (snapshot) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH,
      PATH: { ADDRESS_ALL },
    } = config,
    endpoint = obtain(ADDRESS_ALL, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default addressAll;
