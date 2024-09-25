/**
 * Parse a Bybit API response, usually for shortening long arrays.
 *
 * @module response/bybit/parse
 */

import config from '#config/bybit.json' with { type: 'json' };
import { obtainName } from '#lib/utility.mjs';
import settings from '#settings/bybit.json' with { type: 'json' };

import filter from './parse/filter.mjs';
import find from './parse/find.mjs';
import map from './parse/map.mjs';

/**
 * Parse response
 * @param {{ json: object, status: string, statusText: string }} response
 * @param {string} path
 * @typedef Result
 * @prop {string} code .
 * @prop {string} description .
 * @prop {object} jsonParsed .
 * @prop {string} output .
 * @prop {string} status .
 * @prop {string} statusText .
 * @returns {Result}
 */
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
      RESPONSE: { CODE, DESCRIPTION },
      TRADE,
    } = config,
    {
      currency: { base, quote },
      parse,
    } = settings,
    { json, status, statusText } = response,
    code = json[CODE],
    description = json[DESCRIPTION],
    parsed = [];
  let jsonParsed;

  if (parse.includes(obtainName(path, PATH))) {
    let isFiltered = true,
      isFound = true,
      isMapped = true;

    switch (path) {
      case BALANCE_ALL:
        jsonParsed = filter(json, {
          criterion: (item) => Number(item.transferBalance) || Number(item.walletBalance),
          list: 'balance',
        });
        break;
      case ORDER_ALL:
      case TRADE_HISTORY_ALL:
        jsonParsed = filter(json, {
          criterion: data.side || TRADE.SIDE.BUY,
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
        jsonParsed = find(json, {
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
        jsonParsed = map(json, {
          key: 'coin',
          list: 'rows',
        });
        break;
      case CURRENCY_NETWORK_ALL:
        jsonParsed = map(json, {
          key: ['coin', 'chain'],
          list: ['rows', 'chains'],
        });
        break;
      default:
        isMapped = false;
    }
    if (isFiltered) parsed.push('items filtered');
    if (isFound) parsed.push('found one item');
    if (isMapped) parsed.push('items mapped');

    const output = parsed.length ? ` (${parsed.join(', ')})` : '';

    console.info(`Parsed endpoint "${obtainName(path, PATH)}" successfully${output}.`);
  } else console.info(`Parse: endpoint "${obtainName(path, PATH)}" is not enabled is settings.`);

  const output = parsed.length ? parsed.join(', ') + '.' : '';

  return { code, description, jsonParsed: jsonParsed ?? json, output, status, statusText };
};

export default responseParse;
