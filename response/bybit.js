/**
 * Aggregate Bybit API response.
 *
 * @module response/bybit
 */

import config from '#config/bybit.json' with { type: 'json' };
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import settings from '#settings/bybit.json' with { type: 'json' };

import currencyAll from './bybit/currency/all.mjs';
import currencyNetworkAll from './bybit/currency/network-all.mjs';

/**
 * @todo Find a snapshot file with latest timestamp.
 */
const responseBybit = () => {
  const { handler } = parseArguments();

  global.apiTools = { config, settings };
  if (handler) {
    switch (handler) {
      case 'currency':
      case 'currencyAll':
        return currencyAll();
      case 'currencyNetwork':
      case 'currencyNetworkAll':
        return currencyNetworkAll();
      default:
        throw new Error(responseBybit.name + ': ' + optional(handler));
    }
  } else {
    Promise.resolve()
      .then((response) => currencyAll())
      .then((response) => currencyNetworkAll())
      .catch(console.log.bind(console));
  }
};

responseBybit();

export default null;
