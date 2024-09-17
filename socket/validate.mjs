/**
 * Validate data before send to a web socket channel.
 *
 * @module socket/validate
 */

import { throwRequired, warnOptional, warnRequired } from '../lib/output.mjs';

const socketValidate = (path, isValidParams, defaults, ...options) => {
  const data = { ...defaults },
    {
      config: { PATH },
    } = global.apiTools;
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
          else throwRequired(PATH, path, key);
        }
      }
      if (category === 'warnOptional') {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValidParams({ [key]: value })) data[key] = value;
            else warnOptional(PATH, path, key, data[key]);
          }
        }
      }
      if (category === 'warnRequired') {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValidParams({ [key]: value })) data[key] = value;
            else warnRequired(PATH, path, key);
          }
        }
      }
    }
  }

  return data;
};

export default socketValidate;
