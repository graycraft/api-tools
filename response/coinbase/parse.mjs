/**
 * Parse a Coinbase Advanced API response.
 * Used for retrieving response status code/description and shortening long arrays.
 *
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/error-response
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/status-codes
 * @typedef {import("#lib/constants.mjs").HttpStatusCode} HttpStatusCode
 * @typedef {import("#lib/constants.mjs").HttpStatusText} HttpStatusText
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#types/response/coinbase.d.js").default} Response
 * @typedef {import("../parse.mjs").RParse} RParse
 * @typedef {import("../parse.mjs").RParseStatus} RParseStatus
 * @typedef {import("../parse.mjs").ResponseParse} ResponseParse
 * @module response/coinbase/parse
 */

import config from '#config/coinbase.json' with { type: 'json' };
import settings from '#settings/coinbase.json' with { type: 'json' };

import responseParse from '../parse.mjs';
// import filter from './parse/filter.mjs';
import find from './parse/find.mjs';
import map from './parse/map.mjs';

/**
 * Parse a response.
 * `errors` array might be in a response of some endpoints:
 *   `ADDRESS` - if provide `limit` exceeding maximum value.
 * `error` and `message` properties might be in a response of some endpoints:
 *   `MARKET_ONE` - if do not provide `product_id`.
 * @param {RFetch} response Response of request.
 * @param {string} endpoint Endpoint name.
 * @param {{}} data Request parameters data.
 * @returns {ResponseParse & RParseStatus} Parsed response, response code and description.
 */
const coinbaseParse = (response, endpoint, data) => {
  const { config, prefs } = global.apiTools.coinbase,
    {
      RESPONSE: { OK, SUCCESSFUL },
    } = config,
    { json } = response,
    errors = json.errors,
    code = json.error ?? errors?.[0]?.id ?? OK,
    description = json.message ?? errors?.[0]?.message ?? SUCCESSFUL,
    parse = responseParse(response, endpoint, data, parseJson, prefs);

  return { ...parse, code, description };
};

/**
 * Parse JSON from response.
 * @param {Response} json JSON from response.
 * @param {string} endpoint Endpoint name.
 * @param {{}} data Request parameters data.
 * @returns {RParse} Parsed JSON data.
 */
const parseJson = (json, endpoint, data) => {
  const {
      PATH,
      PATH: { CURRENCY_ALL, CURRENCY_ONE },
    } = config,
    {
      user,
      user: { portfolio },
    } = settings,
    parsed = [],
    path = PATH[endpoint];

  let isFiltered = false,
    isFound = false,
    isMapped = false,
    jsonParsed;

  switch (path) {
    case CURRENCY_ONE:
      jsonParsed = find(json, {
        criterion: user[portfolio].account.asset,
        key: 'asset_id',
        list: 'data',
      });
      break;
    default:
      isFound = false;
  }
  switch (path) {
    case CURRENCY_ALL:
      jsonParsed = map(json, {
        key: ['asset_id', 'code', 'name'],
        list: 'data',
      });
      break;
    default:
      isMapped = false;
  }
  if (isFiltered) parsed.push('items filtered');
  if (isFound) parsed.push('found one item');
  if (isMapped) parsed.push('items mapped');
  console.info(
    `Parsed endpoint "${endpoint}" successfully${parsed.length ? ` (${parsed.join(', ')})` : ''}.`,
  );

  return { jsonParsed: jsonParsed ?? json };
};

export default coinbaseParse;
