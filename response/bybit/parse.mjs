/**
 * Parse a Bybit API response, usually for shortening long arrays.
 *
 * @module response/bybit/parse
 */

import filter from './parse/filter.mjs';
import find from './parse/find.mjs';
import map from './parse/map.mjs';
import config from '../../configuration/bybit.json' with { type: 'json' };
import { obtainName } from '../../lib/utility.mjs';
import settings from '../../settings/bybit.json' with { type: 'json' };

const responseParse = (response, path, data) => {
  const {
      PATH,
      PATH: {
        BALANCE_ALL,
        CURRENCY_ALL,
        CURRENCY_NETWORK_ALL,
        MARKET_HISTORY,
        MARKET_INFORMATION,
        MARKET_TICKERS,
        ORDER_ALL,
        TRADE_HISTORY_ALL,
      },
      TRADE,
    } = config,
    {
      currency: { base, quote },
      parse,
    } = settings;
  let { json, statusText } = response;

  /**
   * @todo Refactor to `response/parse`.
   */
  if (parse.includes(obtainName(path, PATH))) {
    let isFiltered = true,
      isFound = true,
      isMapped = true;

    switch (path) {
      case BALANCE_ALL:
        json = filter(json, {
          criterion: (item) => Number(item.transferBalance) || Number(item.walletBalance),
          list: 'balance',
        });
        break;
      case ORDER_ALL:
      case TRADE_HISTORY_ALL:
        json = filter(json, {
          criterion: data.side || TRADE.BUY,
          key: 'side',
          list: 'list',
        });
        break;
      default:
        isFiltered = false;
    }
    switch (path) {
      /* case CURRENCY_ALL: json = find(json, {
        criterion: base,
        key: "coin",
        list: "rows",
      }); break; */
      case MARKET_HISTORY:
      case MARKET_INFORMATION:
      case MARKET_TICKERS:
        json = find(json, {
          criterion: data.symbol ?? base + quote,
          key: 'symbol',
          list: 'list',
        });
        break;
      default:
        isFound = false;
    }
    switch (path) {
      case CURRENCY_ALL:
        json = map(json, {
          key: 'coin',
          list: 'rows',
        });
        break;
      case CURRENCY_NETWORK_ALL:
        json = map(json, {
          key: ['coin', 'chain'],
          list: ['rows', 'chains'],
        });
        break;
      default:
        isMapped = false;
    }
    if (isFiltered || isFound || isMapped) {
      const parsed = [];

      statusText += ' (';
      if (isFiltered) parsed.push('filtered');
      if (isFound) parsed.push('found');
      if (isMapped) parsed.push('mapped');
      statusText += parsed.join(', ') + ')';
    }
    console.info(`Parsed endpoint "${obtainName(path, PATH)}" successfully.`);
  } else console.info(`Parse: endpoint "${obtainName(path, PATH)}" is not enabled is settings.`);

  return { json, statusText };
};

export default responseParse;
