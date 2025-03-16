/**
 * Validate data before send to a web socket channel.
 *
 * @typedef {import("#types/common.js").dictionary} dictionary
 * @typedef {import("#types/common.js").dictLike} dictLike
 * @module socket/validate
 */

import { throwRequired, warnOptional, warnRequired } from '#lib/output.mjs';

/**
 * @param {string} path
 * @param {(param: dictionary) => {}} isValidParams
 * @param {dictLike} defaults
 * @param  {...any} options
 * @returns
 */
const socketValidate = (path, isValidParams, defaults, ...options) => {
  const data = { ...defaults },
    {
      config: { PATH },
    } = global.apiTools.coinbase;
  let index = options.length,
    category,
    key;

  while (index) {
    --index;

    const option = options[index];

    for (category in option) {
      if (category === 'throwRequired') {
        for (key in option[category]) {
          const value = option[category][key];

          if (isValidParams({ [key]: value })) data[key] = value;
          else throwRequired(path, PATH, key);
        }
      }
      if (category === 'warnOptional') {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValidParams({ [key]: value })) data[key] = value;
            else warnOptional(path, PATH, key, data[key]);
          }
        }
      }
      if (category === 'warnRequired') {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValidParams({ [key]: value })) data[key] = value;
            else warnRequired(path, PATH, key);
          }
        }
      }
    }
  }

  return data;
};

export default socketValidate;
