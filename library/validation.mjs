/**
 * Validate parameters for a request.
 *
 * @typedef {Object<string, string>} Dict
 * @module library/validation
 */

import { throwRequired, warnOptional, warnRequired } from './output.mjs';

/**
 * Validate request parameters.
 * @param {{ PATH: Dict }} config
 * @param {string} path
 * @param {(Dict) => {}} isValid
 * @param {Dict} defaults
 * @param {...Dict[]} options
 * @returns {Dict}
 */
const validate = (config, path, isValid, defaults, ...options) => {
  const data = defaults,
    { PATH } = config;
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

          if (isValid({ [key]: value })) data[key] = value;
          else throwRequired(path, PATH, key);
        }
      }
      if (category === 'warnOptional') {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValid({ [key]: value })) data[key] = value;
            else warnOptional(path, PATH, key, data[key]);
          }
        }
      }
      if (category === 'warnRequired') {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValid({ [key]: value })) data[key] = value;
            else warnRequired(path, PATH, key);
          }
        }
      }
    }
  }

  return data;
};

export default validate;
