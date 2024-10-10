/**
 * Validate parameters for a request.
 *
 * @typedef {import("#types/common.d.js").Dict} Dict
 * @typedef {import("#types/common.d.js").DictLike} DictLike
 * @module request/validate
 */

import { throwRequired, warnOptional, warnRequired } from '#lib/output.mjs';

/**
 * @param {(string | Dict)[]} list
 * @param {string} value
 * @param {string} [prop]
 * @returns {boolean}
 */
export const hasSome = (list, value, prop) => {
  const boolean = list.some((item) => (prop ? item[prop] === value : item === value));

  return boolean;
};

/**
 * @param {string[]} list
 * @param {string} value
 * @param {(item1, item2) => {}} pair
 * @returns {boolean}
 */
export const isPair = (list, value, pair) => {
  const boolean = list.some((item1) =>
    list.some((item2) => pair(item1, item2) === value && item1 !== item2),
  );

  return boolean;
};

/**
 * @param {{ PATH: Dict }} config
 * @param {string} path
 * @param {(param: DictLike) => boolean} isValid
 * @param {{
 *   defaults?: DictLike,
 *   optional?: DictLike,
 *   required?: DictLike,
 *   throw?: DictLike,
 * }} options
 * @returns {{}} Validated request parameters data.
 */
export const requestValidate = (config, path, isValid, options) => {
  const data = { ...options.defaults },
    { PATH } = config;
  let category, key;

  for (category in options) {
    if (category === 'optional') {
      for (key in options[category]) {
        const value = options[category][key];

        if (value) {
          if (isValid({ [key]: value })) data[key] = value;
          else warnOptional(path, PATH, key, data[key]);
        }
      }
    }
    if (category === 'required') {
      for (key in options[category]) {
        const value = options[category][key];

        if (value) {
          if (isValid({ [key]: value })) data[key] = value;
          else warnRequired(path, PATH, key);
        }
      }
    }
    if (category === 'throw') {
      for (key in options[category]) {
        const value = options[category][key];

        if (isValid({ [key]: value })) data[key] = value;
        else throwRequired(path, PATH, key);
      }
    }
  }

  return data;
};
