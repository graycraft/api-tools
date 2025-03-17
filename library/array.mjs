/**!
 * Array related methods for common application use cases.
 *
 * @module library/array
 */

/**
 * Append new item to an array.
 * Same as native push but returns target array.
 * @example append(["a", "b"], "c");
 *   ["a", "b", "c"]
 * @param {any[]} array
 * @param {any} item
 * @returns {array}
 */
export const append = (array, item) => {
  array.push(item);

  return array;
};

/**
 * Check whether an array has duplicate items or not.
 * @param {Array<bigint | boolean | number | string | symbol>} array
 * @returns
 */
export const hasDuplicates = (array) => {
  const { length } = array,
    { size } = new Set(array),
    isNotEqual = length !== size;

  return isNotEqual;
};

/**
 * Prepend new item to an array.
 * Same as native unshift but returns target array.
 * @example prepend(["b", "c"], "a");
 *   ["a", "b", "c"]
 * @param {any[]} array
 * @param {any} item
 * @returns {array}
 */
export const prepend = (array, item) => {
  array.unshift(item);

  return array;
};
