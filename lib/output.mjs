/**!
 * Output message to a console or throw exception for critical error.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/console/dir_static
 * @see https://nodejs.org/docs/latest/api/console.html#consoledirobj-options
 * @see https://nodejs.org/docs/latest/api/util.html#utilinspectobject-showhidden-depth-colors
 * @module lib/output
 */

import { fallback, invalid, optional, required } from './template.mjs';
import { obtainName } from './utility.mjs';

/**
 * Print a list of the properties of an object with maximum nesting depth.
 * Number of Array, TypedArray, Map, Set, WeakMap, WeakSet items is maximized too (default is 100).
 */
export const dirObject = (name, object) => {
  console.dir({ [name]: object }, { colors: true, depth: null, maxArrayLength: null });
};

/**
 * Can not determine param value and can not substitute with default, e.g. random values.
 * API has no predefined value, e.g. `orderId`, `price`, `qty`, `subMemberId`.
 */
export const throwRequired = (PATH, path, param) => {
  throw new Error(obtainName(path, PATH) + '. ' + required(param));
};

/**
 * Can not determine param value but can substitute with default.
 * API might has or has no predefined value.
 */
export const warnOptional = (PATH, path, param, value) => {
  console.warn(obtainName(path, PATH) + ': ' + optional(param) + fallback(value));
};

/**
 * Can not determine param value and can not substitute with default, e.g. range values.
 * API has predefined value, e.g. `coin`, `limit`.
 */
export const warnRequired = (PATH, path, param) => {
  console.warn(obtainName(path, PATH) + ': ' + invalid(param));
};
