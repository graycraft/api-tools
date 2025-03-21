/**
 * Parse a Bybit API response.
 * Used for retrieving response status code/description and shortening long arrays.
 *
 * @typedef {import("#lib/constants.mjs").httpStatusCode} httpStatusCode
 * @typedef {import("#lib/constants.mjs").httpStatusText} httpStatusText
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#types/bybit.ts").default} IBybit
 * @typedef {import("#types/response/bybit.js").default} JResponse
 * @typedef {import("../parse.mjs").RParse} RParse
 * @typedef {import("../parse.mjs").RParseStatus} RParseStatus
 * @typedef {import("../parse.mjs").ResponseParse} ResponseParse
 * @typedef {{
 *   json: {
 *     message: string;
 *     retCode: number;
 *     retMsg: string;
 *   }
 * }} RFetchBybit
 * @module response/bybit/parse
 */

import config from '#config/bybit.json' with { type: 'json' };

import filter from './parse/filter.mjs';
import find from './parse/find.mjs';
import map from './parse/map.mjs';
import responseParse from '../parse.mjs';

/**
 * Parse a response.
 * @param {RFetch} response Response of a request.
 * @param {string} endpoint Endpoint name.
 * @param {{}} data Request data.
 * @returns {ResponseParse & RParseStatus} Parsed response, response code and description.
 */
const bybitParse = (response, endpoint, data) => {
  const { config, prefs } = global.apiTools.bybit,
    {
      RESPONSE: { CODE, DESCRIPTION },
    } = /** @type {IBybit["config"]} */ (config),
    { json } = /** @type {RFetchBybit} */ (response),
    code = json[CODE],
    description = json[DESCRIPTION],
    parse = responseParse(response, endpoint, data, parseJson, prefs);

  return { ...parse, code, description };
};

/**
 * Parse JSON data from a response.
 * @param {JResponse} json JSON data from a response.
 * @param {string} endpoint Endpoint name.
 * @param {{ [k in ("side" | "symbol")]: string }} data Request parameters data.
 * @returns {RParse} Parsed JSON data.
 */
const parseJson = (json, endpoint, data) => {
  const {
      COIN: { BASE, QUOTE },
      ORDER,
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
    } = /** @type {IBybit["config"]} */ (config),
    path = PATH[endpoint],
    parsed = [];

  let isFiltered = true,
    isFound = true,
    isMapped = true,
    jsonParsed;

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
        criterion: data.side || ORDER.SIDE.BUY,
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
        criterion: data.symbol ?? BASE.NAME + QUOTE.NAME,
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

  console.info(
    `Parsed response from endpoint "${endpoint}" successfully${parsed.length ? ` (${parsed.join(', ')})` : ''}.`,
  );

  return { jsonParsed: jsonParsed ?? json };
};

export default bybitParse;
