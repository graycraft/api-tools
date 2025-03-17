/**
 * Handle Coinbase Advanced API new account address response operations.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#create-address
 * @typedef {import("#res/operate.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/address/new
 */

import { obtain } from '#lib/utility.mjs';
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
    endpoint = obtain(ADDRESS_NEW, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default addressNew;
