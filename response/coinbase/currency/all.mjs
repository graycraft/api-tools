/**
 * Handle Coinbase Advanced API all currencies response operations.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/currency/all
 */

import { obtain } from '#lib/utility.mjs';
import { currencyAll as schema } from '#res/coinbase/currency/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const currencyAll = (snapshot) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH,
      PATH: { CURRENCY_ALL },
    } = config,
    endpoint = obtain(CURRENCY_ALL, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default currencyAll;
