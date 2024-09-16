/**
 * Validate parameters for a request.
 * 
 * @module lib/validation
 */

import { throwRequired, warnOptional, warnRequired } from "./output.mjs";

const validate = (path, isValid, defaults, ...options) => {
  const data = defaults,
    { config: { PATH } } = global.apiTools;
  let index = options.length, category, key;

  while (index) {
    --index;
    const option = options[index];

    for (category in option) {
      if (category === "throwRequired") {
        for (key in option[category]) {
          const value = option[category][key];

          if (isValid({ [key]: value }))
            data[key] = value
          else throwRequired(PATH, path, key);
        }
      }
      if (category === "warnOptional") {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValid({ [key]: value }))
              data[key] = value
            else warnOptional(PATH, path, key, data[key]);
          }
        }
      }
      if (category === "warnRequired") {
        for (key in option[category]) {
          const value = option[category][key];

          if (value) {
            if (isValid({ [key]: value }))
              data[key] = value
            else warnRequired(PATH, path, key);
          }
        }
      }
    }
  }

  return data
};

export default validate
