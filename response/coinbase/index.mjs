/**
 * Aggregate a Coinbase Advanced API response.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/index
 */

import { argv } from 'node:process';

import config from '#config/coinbase.json' with { type: 'json' };
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import prefs from '#prefs/coinbase.json' with { type: 'json' };
import status from '#res/coinbase/status.json' with { type: 'json' };
import settings from '#settings/coinbase.json' with { type: 'json' };

import addressAll from './address/all.mjs';
import addressOne from './address/one.mjs';
import addressNew from './address/new.mjs';
import addressTransactions from './address/transactions.mjs';
import currencyAll from './currency/all.mjs';

const timestamp = Date.now();

/**
 * @returns {Promise<RSnapshot>}
 */
const responseCoinbase = async () => {
  /**
   * Global types for each API are defined in `#types/global.d.ts`
   * @type {any}
   */
  const coinbase = {
      config,
      name: 'coinbase',
      prefs,
      settings,
      status,
    },
    { handler, options, params } = parseArguments(argv);

  global.apiTools = { coinbase, options, timestamp };

  if (handler) {
    switch (handler) {
      case 'addressAll':
        return await addressAll.apply(null, params);
      case 'address':
      case 'addressOne':
        return await addressOne.apply(null, params);
      case 'addressNew':
        return await addressNew.apply(null, params);
      case 'addressTransactions':
      case 'addressTxns':
        return await addressTransactions.apply(null, params);
      case 'currencyAll':
        return await currencyAll.apply(null, params);
      default:
        throw new Error(responseCoinbase.name + ': ' + optional(handler));
    }
  } else {
    return await Promise.resolve()
      .then((response) => currencyAll.apply(null, params))
      .catch(console.error.bind(console));
  }
};

export default responseCoinbase;
