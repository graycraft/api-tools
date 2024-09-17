/**
 * Bybit API market info endpoint.
 *
 * @module request/bybit/market/info
 */

import config from '../../../configuration/bybit.json' with { type: 'json' };
import settings from '../../../settings/bybit.json' with { type: 'json' };
import { warnOptional, warnRequired } from '../../../lib/output.mjs';
import bybitGet from '../get.mjs';

const {
    PATH: { MARKET_INFO },
  } = config,
  {
    account: { category },
    currency: { base, quote },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/instrument
 */
const marketInfo = (symbol, limit) => {
  const data = {
    // baseCoin: base,
    category,
    // cursor,
    // limit,
    // status,
    symbol: base + quote,
  };

  if (limit) {
    if (Number(limit)) data.limit = limit;
    else warnRequired(PATH, MARKET_INFO, 'limit');
  }
  if (symbol) {
    if (typeof symbol === 'string') data.symbol = symbol;
    else warnOptional(PATH, MARKET_INFO, 'symbol', data.symbol);
  }

  return bybitGet(null, MARKET_INFO, data);
};

export default marketInfo;
