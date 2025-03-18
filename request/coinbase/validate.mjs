/**
 * Validate parameters for a Coinbase Advanced API request.
 *
 * @typedef {import("#types/collection/coinbase/currency_all.js").default} JCurrencyAll
 * @typedef {import("#types/common.ts").dictLike} dictLike
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {import("#types/coinbase.ts").orderTypes} orderTypes
 * @module request/coinbase/validate
 */

import { withinRange } from '#lib/boolean.mjs';
import { NUMBER, REGEXP } from '#lib/constants.mjs';
import { fileNewest, fileReadJson } from '#lib/file_system.mjs';

import { hasSome, isPair, requestValidate } from '../validate.mjs';

/**
 * @param {string} path
 * @param {{
 *   defaults?: dictLike | object;
 *   optional?: dictLike | object;
 *   required?: dictLike | object;
 *   throw?: dictLike | object;
 * }} options
 * @returns
 */
const coinbaseValidate = (path, options) =>
  requestValidate(global.apiTools.coinbase.config, path, isValid, options);

/**
 * Validate a request data parameter before send.
 * Coinbase Advanced API does not expose available networks.
 * It is only possible to collect networks by generating a deposit address and aggregating from `ADDRESS`.
 * @param {dictionary | { order_ids: { [key in orderTypes]: object | string } }} param
 * @returns {boolean}
 */
const isValid = (param) => {
  const { UUID } = REGEXP,
    { config } = global.apiTools.coinbase,
    {
      CONTRACT,
      ORDER,
      ORDER: { SIDE },
      PRODUCT,
      SORT,
      USER: { PORTFOLIO },
    } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/coinbase/currency_all',
    currencyFile = fileNewest(currencyDir),
    currencyAll = /** @type {JCurrencyAll} */ (fileReadJson(currencyDir, currencyFile.name)).map(
      (item) => item.code,
    );

  /**
   * @todo Pass array `?order_types=BTC-USDC&order_types=ETH-USDC` instead of `?order_types=BTC-USDC,ETH-USDC` as API requires.
   * @todo Pass array `?product_ids=BTC-USDC&product_ids=ETH-USDC` instead of `?product_ids=BTC-USDC,ETH-USDC` as API requires.
   * @todo `cursor`.
   * `name` as address label is a random string.
   */
  switch (key) {
    case 'account_uuid':
    case 'address_uuid':
    case 'asset_id':
    case 'next_starting_after':
    case 'portfolio_uuid':
    case 'previous_ending_before':
    case 'retail_portfolio_id':
      return UUID.test(value);
    case 'aggregation_price_increment':
    case 'limit':
      return Boolean(Number(value));
    case 'asset_filters':
      return hasSome(currencyAll, value);
    case 'contract_expiry_type':
      return hasSome(CONTRACT.EXPIRY, value);
    case 'end':
      return withinDays(1, value, 31);
    case 'expiring_contract_status':
      return hasSome(CONTRACT.STATUS, value);
    case 'get_all_products':
      return value === 'true';
    case 'order_configuration':
    case 'order_ids':
      const order = value[ORDER.LIMIT] ?? value[ORDER.MARKET];

      /** `ORDER_PLACE` endpoints. */
      if (order) {
        if (value[ORDER.MARKET]) {
          return Boolean(Number(order.base_size)) || Boolean(Number(order.quote_size));
        }

        return Boolean(Number(order.base_size)) && Boolean(Number(order.limit_price));
      }

      return value.every((/** @type {string} */ item) => UUID.test(item));
    case 'order_placement_source':
      return hasSome(ORDER.PLACEMENT, value);
    case 'order_side':
      return hasSome(Object.values(SIDE), value);
    case 'order_status':
      return hasSome(ORDER.STATUS, value);
    case 'order_types':
      return hasSome(ORDER.TYPE, value);
    case 'portfolio_type':
      return hasSome(PORTFOLIO, value);
    case 'product_id':
      return isPair(currencyAll, value, pair);
    case 'product_ids':
      return value.every((/** @type {string} */ item) => isPair(currencyAll, item, pair));
    case 'product_type':
      return hasSome(Object.values(PRODUCT), value);
    case 'sort_by':
      return hasSome(SORT, value);
    case 'start':
      return withinDays(1, value, 31);
    case 'time_in_forces':
      return hasSome(ORDER.TIME_IN_FORCES, value);
    default:
      return typeof value === 'string';
  }
};

/**
 * @param {string} base
 * @param {string} quote
 * @returns {string}
 */
export const pair = (base, quote) => {
  const string = [base, quote].join('-');

  return string;
};

/**
 * @param {string} pairs
 * @returns {string[]}
 */
export const pairs = (pairs) => {
  const string = pairs?.split(',');

  return string;
};

/**
 * @param {number} min
 * @param {string} value
 * @param {number} max
 * @returns {boolean}
 */
const withinDays = (min, value, max) => {
  const {
      DATE: { DAY },
    } = NUMBER,
    { timestamp } = global.apiTools,
    after = timestamp + DAY * min,
    before = timestamp - DAY * max,
    isWithin = withinRange(before, value, after);

  return isWithin;
};

export default coinbaseValidate;
