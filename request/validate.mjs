/**
 * Validate parameters for a request.
 *
 * @typedef {import("#types/common.ts").dictLike} dictLike
 * @module request/validate
 */

/**
 * @typedef {import("#types/common.ts").dictionary<T>} dictionary
 * @template T
 */

import { throwRequired, warnOptional, warnRequired } from '#lib/output.mjs';

/**
 * @param {(dictionary<string> | string)[]} list
 * @param {string} value
 * @param {string} [prop]
 * @returns {boolean}
 */
export const hasSome = (list, value, prop) => {
  const boolean = list.some((item) =>
    prop && item instanceof Object ? item[prop] === value : item === value,
  );

  return boolean;
};

/**
 * @param {string[]} list
 * @param {string} value
 * @param {(item1: string, item2: string) => {}} pair
 * @returns {boolean}
 */
export const isPair = (list, value, pair) => {
  const boolean = list.some((item1) =>
    list.some((item2) => pair(item1, item2) === value && item1 !== item2),
  );

  return boolean;
};

/**
 * Validate request parameters.
 * @param {{ PATH: dictionary<string> }} config
 * @param {string} path
 * @param {(param: dictionary<string> | object) => boolean} isValid
 * @param {{
 *   defaults?: dictLike | object;
 *   optional?: dictLike | object;
 *   required?: dictLike | object;
 *   throw?: dictLike | object;
 * }} options
 * @returns {{}} Validated request parameters data.
 */
export const requestValidate = (config, path, isValid, options) => {
  const data = { ...options.defaults },
    { PATH } = config;

  let category, /** @type {string} */ key;

  for (category in options) {
    if (category === 'optional') {
      for (key in options[category]) {
        const value = /** @type {dictLike} */ (options[category])[key];

        if (value) {
          if (isValid({ [key]: value })) data[key] = value;
          else warnOptional(path, PATH, key, data[key]);
        }
      }
    }
    if (category === 'required') {
      for (key in options[category]) {
        const value = /** @type {dictLike} */ (options[category])[key];

        if (value) {
          if (isValid({ [key]: value })) data[key] = value;
          else warnRequired(path, PATH, key);
        }
      }
    }
    if (category === 'throw') {
      for (key in options[category]) {
        const value = /** @type {dictLike} */ (options[category])[key];

        if (isValid({ [key]: value })) data[key] = value;
        else throwRequired(path, PATH, key);
      }
    }
  }

  return data;
};
