/**
 * Validate data before send to a web socket channel.
 *
 * @module socket/validate
 */

import { throwRequired, warnOptional, warnRequired } from '#lib/output.mjs';

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
