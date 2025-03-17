/**
 * Subscribe to Coinbase Advanced API web socket channels.
 *
 * @module socket/coinbase
 */

import { argv } from 'node:process';

import { dirObject } from '#lib/output.mjs';
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import prefs from '#prefs/coinbase.json' with { type: 'json' };
import settings from '#settings/coinbase.json' with { type: 'json' };

import candles from './coinbase/channel/candles.mjs';
import futuresBalance from './coinbase/channel/futures_balance.mjs';
import heartbeats from './coinbase/channel/heartbeats.mjs';
import level2 from './coinbase/channel/level2.mjs';
import marketTrades from './coinbase/channel/market_trades.mjs';
import status from './coinbase/channel/status.mjs';
import ticker from './coinbase/channel/ticker.mjs';
import tickerBatch from './coinbase/channel/ticker_batch.mjs';
import user from './coinbase/channel/user.mjs';
import config from '../configuration/coinbase.json' with { type: 'json' };

const { debug } = prefs,
  timestamp = Date.now();

const requestCoinbase = () => {
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

  if (debug || options.debug) dirObject('global.apiTools', global.apiTools);
  if (handler) {
    switch (handler) {
      case 'candles':
        return candles.apply(null, params);
      case 'futuresBalance':
        return futuresBalance.apply(null, params);
      case 'heartbeats':
        return heartbeats();
      case 'level2':
        return level2.apply(null, params);
      case 'marketTrades':
        return marketTrades.apply(null, params);
      case 'status':
        return status.apply(null, params);
      case 'ticker':
        return ticker.apply(null, params);
      case 'tickerBatch':
        return tickerBatch.apply(null, params);
      case 'user':
        return user.apply(null, params);
      default:
        throw new Error(requestCoinbase.name + ': ' + optional(handler));
    }
  } else {
    Promise.resolve()
      .then((response) => level2.apply(null, params))
      .catch(console.error.bind(console));
  }
};

requestCoinbase();

export default null;
