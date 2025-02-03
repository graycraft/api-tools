/**!
 * Output message to a console or throw exception to prevent execution if error can not be handled.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console/dir_static
 * @see https://nodejs.org/docs/latest/api/console.html#consoledirobj-options
 * @see https://nodejs.org/docs/latest/api/util.html#utilinspectobject-showhidden-depth-colors
 * @typedef {Object<string, string>} Dict
 * @typedef {{
 *   flow?: string | undefined;
 *   verbose?: boolean | undefined;
 * }} Options
 * @typedef {{
 *   enabled: string[];
 *   exit: boolean;
 *   verbose: string[];
 * }} Preferences
 * @module library/output
 */

import { fallback, invalid, optional, required } from './template.mjs';
import { obtainName } from './utility.mjs';

/**
 * Output a list of the properties of an object with maximum nesting depth.
 * Number of Array, TypedArray, Map, Set, WeakMap, WeakSet items is maximized too (default is 100).
 * @param {string} name Name to output in title.
 * @param {{}} data Data to output.
 * @returns {boolean} Whether information has been listed or not.
 */
export const dirObject = (name, data) => {
  console.dir({ [name]: data }, { colors: true, depth: null, maxArrayLength: null });

  return true;
};

/**
 * Output gathered information about request snapshot in the following format:
 * {
 *   Snapshot: {
 *     [ENDPOINT]: '',
 *     [AUTH]: {},
 *     [METHOD]: {
 *       headers: {},
 *       data: {}
 *     },
 *     [STATUS]: {
 *       headers: {},
 *       json: {}
 *     }
 *   }
 * }
 * @param {string} endpoint Request endpoint name.
 * @param {Options} options Options from CLI.
 * @param {Preferences} prefs Preferences of an API.
 * @param {{}} output Gathered information to output.
 * @returns {boolean} Whether information has been output or not.
 */
export const dirSnapshot = (endpoint, options, prefs, output) => {
  const { flow, verbose } = options,
    isEnabled = prefs.enabled.includes('verbose'),
    isVerbose = prefs.verbose.includes(endpoint);

  if (typeof verbose === 'boolean') {
    if (verbose) {
      dirObject('Snapshot', output);
      if (prefs.exit && flow === 'exit') global.process.exit();

      return true;
    }
  } else {
    if (isEnabled && isVerbose) {
      dirObject('Snapshot', output);

      return true;
    }
  }

  return false;
};

/**
 * Call this method if can not determine parameter value and can not substitute with default, e.g. random values.
 * API has no predefined value, e.g. `orderId`, `price`, `qty`, `subMemberId`.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {Dict} PATH Path dictionary from configuration of a specific API.
 * @param {string} param Parameter to output.
 * @returns {boolean} Whether information has been shown or not.
 */
export const throwRequired = (template, PATH, param) => {
  throw new Error(obtainName(template, PATH) + '. ' + required(param));
};

/**
 * Call this method if can not determine parameter value but can substitute with default.
 * API might has or has no predefined value.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {Dict} PATH Path dictionary from configuration of a specific API.
 * @param {string} param Parameter to output.
 * @param {string | string[]} value Fallback value of a parameter.
 * @returns {boolean} Whether information has been shown or not.
 */
export const warnOptional = (template, PATH, param, value) => {
  console.warn(obtainName(template, PATH) + ': ' + optional(param) + fallback(value));

  return true;
};

/**
 * Call this method if can not determine parameter value and can not substitute with default, e.g. range values.
 * API has predefined value, e.g. `coin`, `limit`.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {Dict} PATH Path dictionary from configuration of a specific API.
 * @param {string} param Parameter to output.
 * @returns {boolean} Whether information has been shown or not.
 */
export const warnRequired = (template, PATH, param) => {
  console.warn(obtainName(template, PATH) + ': ' + invalid(param));

  return true;
};
