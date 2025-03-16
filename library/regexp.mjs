/**!
 * Regular expression related methods for common application use cases.
 *
 * @module library/regexp
 */

import { REGEXP } from '#lib/constants.mjs';
import { stringifyPath } from '#lib/fetch.mjs';

/**
 * Compose JSON-Schema pattern from a regular expression by its name.
 * @param {Object<string, keyof REGEXP> | RegExp | keyof REGEXP} target Map-like object of template expressions
 *   to regular expression names, regular expression or a regular expression name from constants.
 * @param {string} [template] String as template literal.
 * @returns {string} JSON-Schema pattern.
 */
export const composePattern = (target, template) => {
  let pattern;

  if (target instanceof Object) {
    if (target instanceof RegExp) {
      pattern = String(target).replaceAll('\\-', '-').slice(1, -1);
    } else {
      pattern =
        '^' +
        stringifyPath(
          template,
          Object.entries(target)
            .map((entry) => ({
              [entry[0]]: String(REGEXP[entry[1]]).replaceAll('\\-', '-').slice(2, -2),
            }))
            .reduce((accum, item) => ((accum = { ...accum, ...item }), accum), {}),
        ) +
        '$';
    }
  } else {
    pattern = String(REGEXP[target]).replaceAll('\\-', '-').slice(1, -1);
  }

  return pattern;
};
