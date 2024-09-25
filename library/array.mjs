/**!
 * Array related methods for common application use cases.
 *
 * @module lib/array
 */

/**
 * Append new item to array.
 * Same as native push but return target array.
 * @param {Array} array
 * @param {any} item
 * @returns {Array}
 * @example
 * append(["a", "b"], "c");
 *   ["a", "b", "c"]
 */
export const append = (array, item) => {
  array.push(item);

  return array;
};

export const hasDuplicates = (array) => {
  const { length } = array,
    { size } = new Set(array),
    isNotEqual = length !== size;

  return isNotEqual;
};

/**
 * Prepend new item to array.
 * Same as native unshift but return target array.
 * @param {Array} array
 * @param {any} item
 * @returns {Array}
 * @example
 * prepend(["b", "c"], "a");
 *   ["a", "b", "c"]
 */
export const prepend = (array, item) => {
  array.unshift(item);

  return array;
};

/**
 * Stack two arrays to one.
 * Same as native concat but modify and return target array.
 * @param {Array} array1
 * @param {Array} array2
 * @returns {Array}
 * @example
 * stack(["a", "b"], ["c"]);
 *   ["a", "b", "c"]
 */
export const stack = (array1, array2) => {
  array2.forEach(function (v) {
    array1[array1.length] = v;
  });

  return array1;
};
