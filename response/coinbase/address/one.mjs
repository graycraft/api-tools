/**
 * Handle Coinbase Advanced API one account address response operation.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-addresses#show-address
 * @typedef {import("#res/operate.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/address/one
 */

import { obtain } from '#lib/utility.mjs';
import { addressOne as schema } from '#res/coinbase/address/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const addressOne = (snapshot) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH,
      PATH: { ADDRESS_ONE },
    } = config,
    endpoint = obtain(ADDRESS_ONE, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default addressOne;
