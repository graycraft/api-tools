/**
 * Subscribe to Coinbase Advanced API web socket channels.
 *
 * @module socket/coinbase
 */

import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
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

const requestCoinbase = () => {
  const { handler, params } = parseArguments();

  global.apiTools = { config, settings };
  if (handler) {
    switch (handler) {
      case 'candles':
        return candles(...params);
      case 'futuresBalance':
        return futuresBalance(...params);
      case 'heartbeats':
        return heartbeats();
      case 'level2':
        return level2(...params);
      case 'marketTrades':
        return marketTrades(...params);
      case 'status':
        return status(...params);
      case 'ticker':
        return ticker(...params);
      case 'tickerBatch':
        return tickerBatch(...params);
      case 'user':
        return user(...params);
      default:
        throw new Error(requestCoinbase.name + ': ' + optional(handler));
    }
  } else {
    Promise.resolve()
      .then((response) => level2())
      .catch(console.log.bind(console));
  }
};

requestCoinbase();

export default null;
