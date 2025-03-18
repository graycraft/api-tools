/**
 * Validate parameters for a Coinbase Advanced API request.
 *
 * @typedef {import("#types/collection/coinbase/currency_all.js").default} JCurrencyAll
 * @module request/coinbase/validate
 */

/**
 * @typedef {import("#types/common.ts").dictionary<T>} dictionary
 * @template T
 */

import { fileNewest, fileReadJson } from '#lib/file_system.mjs';
import requestValidate from '../validate.mjs';

/**
 * @param {dictionary<string>} param
 * @returns {boolean}
 */
const isValid = (param) => {
  const { config } = global.apiTools.coinbase,
    { ORDER, PRODUCT } = config,
    [key, value] = Object.entries(param)[0],
    currencyDir = 'collection/coinbase/currency_all',
    currencyFile = fileNewest(currencyDir),
    currencyAll = /** @type {string[]} */ (fileReadJson(currencyDir, currencyFile.name)),
    networkDir = 'collection/coinbase/network_all',
    networkFile = fileNewest(networkDir),
    networkAll = /** @type {string[]} */ (fileReadJson(networkDir, networkFile.name));

  switch (key) {
    case 'currency':
      return currencyAll.some((currency) => currency === value);
    case 'limit':
    case 'memberId':
    case 'network':
      return networkAll.some((currency) => currency === value);
    case 'side':
      return Object.values(ORDER.SIDE).some((side) => side === value);
    /**
     * @todo Iterate over full list from collection.
     */
    case 'product_id':
      return Object.values(PRODUCT.BASE).some((currency1) =>
        Object.values(PRODUCT.QUOTE).some(
          (currency2) => currency1 + currency2 === value && currency1 !== currency2,
        ),
      );
    default:
      return typeof value === 'string';
  }
};

/**
 * @param {string} path
 * @param {dictionary<string[]>} defaults
 * @param {...any} options
 * @returns {{}}
 */
const coinbaseValidate = (path, defaults, ...options) => {
  const data = requestValidate(path, isValid, defaults, ...options);

  return data;
};

export default coinbaseValidate;
