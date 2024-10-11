/**!
 * Boolean related methods for common application use cases.
 *
 * @module library/boolean
 */

/**
 * Check whether a value is within the range of minimum and maximum bounds or not.
 * @param {number} min Minimum bound.
 * @param {number | string} value Value to check.
 * @param {number} max Maximum bound.
 * @returns {boolean} Whether a value is within the range or not.
 */
export const withinRange = (min, value, max) => {
  const number = Number(value),
    isWithin = Number(min) <= number && number <= Number(max);

  return isWithin;
};
