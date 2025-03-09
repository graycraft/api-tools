/**
 * Handle Bybit API all networks response operations.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/currency/network-all
 */

import { obtain } from '#lib/utility.mjs';
import { currencyAll as schema } from '#res/bybit/currency/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const currencyNetworkAll = (snapshot) => {
  const { config } = global.apiTools.bybit,
    {
      PATH,
      PATH: { CURRENCY_NETWORK_ALL },
    } = config,
    endpoint = obtain(CURRENCY_NETWORK_ALL, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default currencyNetworkAll;
