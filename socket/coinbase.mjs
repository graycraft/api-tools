/**
 * Request Coinbase Advanced API spot endpoints.
 *
 * @module request/coinbase
 */

import config from '#config/coinbase.json' with { type: 'json' };
import { optional } from '#lib/template.mjs';
import { parseArguments } from '#lib/utility.mjs';
import settings from '#settings/coinbase.json' with { type: 'json' };

import level2 from './coinbase/level2.mjs';

const { TRADE } = config,
  {
    asset: { base },
  } = settings,
  requestCoinbase = () => {
    const { handler, params } = parseArguments();

    global.apiTools = { config, settings };
    if (handler) {
      switch (handler) {
        case 'level2':
          return level2(...params);
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
