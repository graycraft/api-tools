/**
 * Handle Bybit API currency all response operations.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/currency/all
 */

import { obtainName } from '#lib/utility.mjs';
import { currencyAll as schema } from '#res/bybit/currency/schema.mjs';

import operate from '../operate.mjs';

/**
 * Perform an operation on a specific response snapshot file data or latest created.
 * @param {string} [snapshot] Response snapshot file name without `.json` extension.
 * @returns {RSnapshot} File data has been operated.
 */
const currencyAll = (snapshot) => {
  const { config } = global.apiTools.bybit,
    {
      PATH,
      PATH: { CURRENCY_ALL },
    } = config,
    endpoint = obtainName(CURRENCY_ALL, PATH),
    data = operate(endpoint, snapshot, schema);

  return data;
};

export default currencyAll;
