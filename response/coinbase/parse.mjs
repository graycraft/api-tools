/**
 * Parse a Coinbase Advanced API response.
 * Used for retrieving response status code/description and shortening long arrays.
 *
 * @module response/coinbase/parse
 */

import config from '#config/coinbase.json' with { type: 'json' };
import { obtainName } from '#lib/utility.mjs';
import settings from '#settings/coinbase.json' with { type: 'json' };
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
 * @prop {string} status .
 * @prop {string} statusText .
 * @returns {Result}
 */
const responseParse = (response, path) => {
  /** @type {{ PATH: { [key: string]: string } }} */
  const { PATH } = config;
  const {
      PATH: { CURRENCY_ALL, CURRENCY_ONE },
      RESPONSE: { OK, SUCCESSFUL },
    } = config,
    {
      parse,
      user,
      user: { portfolio },
    } = settings,
    { json, status, statusText } = response,
    parsed = [];
  let jsonParsed;

  /**
   * `errors` array might be in a response of some endpoints:
   *   `ADDRESS` - if provide `limit` exceeding maximum value.
   * `error` and `message` properties might be in a response of some endpoints:
   *   `MARKET_ONE` - if do not provide `product_id`.
   */
  const errors = json.errors,
    code = json.error ?? errors?.[0]?.id ?? OK,
    description = json.message ?? errors?.[0]?.message ?? SUCCESSFUL;

  if (parse.includes(obtainName(path, PATH))) {
    let isFiltered = false,
      isFound = false,
      isMapped = false;

    switch (path) {
      case CURRENCY_ALL:
        jsonParsed = map(json, {
          key: ['asset_id', 'code', 'name'],
          list: 'data',
        });
        isMapped = true;
        break;
      case CURRENCY_ONE:
        jsonParsed = find(json, {
          criterion: user[portfolio].account.asset,
          key: 'asset_id',
          list: 'data',
        });
        isFound = true;
        break;
    }
    if (isFiltered) parsed.push('items filtered');
    if (isFound) parsed.push('found one item');
    if (isMapped) parsed.push('items mapped');

    const output = parsed.length ? ` (${parsed.join(', ')})` : '';

    console.info(`Parsed endpoint "${obtainName(path, PATH)}" successfully${output}.`);
  } else console.info(`Parse: endpoint "${obtainName(path, PATH)}" is not enabled is settings.`);

  return { code, description, jsonParsed: jsonParsed ?? json, status, statusText };
};

export default responseParse;
