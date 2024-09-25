/**!
 * Boolean related methods for common application use cases.
 *
 * @module lib/boolean
 */

export const withinRange = (min, value, max) => {
  const number = Number(value),
    isWithin = min <= number && number <= max;

  return isWithin;
};
