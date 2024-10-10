/**
 * Aggregate a Bybit API response.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/index
 */

import { argv } from 'node:process';

import config from '#config/bybit.json' with { type: 'json' };
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import prefs from '#prefs/bybit.json' with { type: 'json' };
import status from '#res/bybit/status.json' with { type: 'json' };
import settings from '#settings/bybit.json' with { type: 'json' };

import currencyAll from './currency/all.mjs';
import currencyNetworkAll from './currency/network-all.mjs';

const timestamp = Date.now();

/**
 * @returns {Promise<RSnapshot>}
 */
const responseBybit = async () => {
  /**
   * Global types for each API are defined in `#types/global.d.ts`
   * @type {any}
   */
  const bybit = {
      config,
      name: 'bybit',
      prefs,
      settings,
      status,
    },
    { handler, options } = parseArguments(argv);

  global.apiTools = { bybit, options, output: {}, timestamp };
  if (handler) {
    switch (handler) {
      case 'currency':
      case 'currencyAll':
        return await currencyAll();
      case 'currencyNetwork':
      case 'currencyNetworkAll':
        return await currencyNetworkAll();
      default:
        throw new Error(responseBybit.name + ': ' + optional(handler));
    }
  } else {
    return await Promise.resolve()
      .then((response) => currencyAll())
      .then((response) => currencyNetworkAll())
      .catch(console.error.bind(console));
  }
};

export default responseBybit;
