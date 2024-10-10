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
    { handler, options } = parseArguments(argv);

  global.apiTools = { coinbase, options, output: {}, timestamp };
  if (handler) {
    switch (handler) {
      case 'currency':
      case 'currencyAll':
        return await currencyAll();
      default:
        throw new Error(responseCoinbase.name + ': ' + optional(handler));
    }
  } else {
    return await Promise.resolve()
      .then((response) => currencyAll())
      .catch(console.error.bind(console));
  }
};

export default responseCoinbase;
