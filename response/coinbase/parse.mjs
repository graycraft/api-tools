/**
 * Parse a Coinbase Advanced API response, usually for shortening long arrays.
 *
 * @module response/coinbase/parse
 */

import filter from './parse/filter.mjs';
import find from './parse/find.mjs';
import map from './parse/map.mjs';
import config from '../../configuration/coinbase.json' with { type: 'json' };
import { obtainName } from '../../lib/utility.mjs';
import settings from '../../settings/coinbase.json' with { type: 'json' };

/**
 * @param {{ json: object, statusText: string }} response
 * @param {string} path
 * @param {object} data
 * @returns {{ json: object, statusText: string }}
 */
const responseParse = (response, path, data) => {
  /** @type {{ PATH: { [key: string]: string } }} */
  const { PATH } = config;
  const {
      PATH: {
        CURRENCY_ALL,
        MARKET_HISTORY,
        MARKET_INFORMATION,
        MARKET_TICKERS,
        NETWORK_ALL,
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
      /* case ACCOUNT_BALANCE_CURRENCIES: json = filter(json, {
        criterion: (item) => Number(item.transferBalance) || Number(item.walletBalance),
        list: "balance",
      }); break; */
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
    /* switch (path) {
      case ACCOUNT_BALANCE:
        json = find(json, {
          criterion: data.asset ?? base,
          key: 'asset',
          list: 'spot_positions',
        });
        break;
      default:
        isFound = false;
    } */
    switch (path) {
      case CURRENCY_ALL:
        json = map(json, {
          key: 'code',
          list: 'data',
        });
        break;
      case NETWORK_ALL:
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
