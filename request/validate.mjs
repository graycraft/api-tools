/**
 * Validate parameters for a request.
 *
 * @module request/validate
 */

import { throwRequired, warnOptional, warnRequired } from '../lib/output.mjs';

/**
 * @param {array} list
 * @param {string} value
 * @param {string} [prop]
 * @returns
 */
export const hasSome = (list, value, prop) => {
  const data = list.some((item) => (prop ? item[prop] === value : item === value));

  return data;
};

/**
 * @param {string} path
 * @param {(param: { [key in string]: any; }) => boolean} isValid
 * @param {{
 *   defaults?: { [key: string]: string },
 *   optional?: { [key: string]: string },
 *   required?: { [key: string]: string },
 *   throw?: { [key: string]: string },
 * }} options
 * @returns {object}
 */
export const requestValidate = (path, isValid, options) => {
  const data = { ...options.defaults },
    {
      config: { PATH },
    } = global.apiTools;
  let category, key;

  for (category in options) {
    if (category === 'optional') {
      for (key in options[category]) {
        const value = options[category][key];

        if (value) {
          if (isValid({ [key]: value })) data[key] = value;
          else warnOptional(PATH, path, key, data[key]);
        }
      }
    }
    if (category === 'required') {
      for (key in options[category]) {
        const value = options[category][key];

        if (value) {
          if (isValid({ [key]: value })) data[key] = value;
          else warnRequired(PATH, path, key);
        }
      }
    }
    if (category === 'throw') {
      for (key in options[category]) {
        const value = options[category][key];

        if (isValid({ [key]: value })) data[key] = value;
        else throwRequired(PATH, path, key);
      }
    }
  }

  return data;
};
