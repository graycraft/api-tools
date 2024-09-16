/**!
 * Array related methods for common application wide use cases.
 * 
 * @module lib/array
 */

export const hasDuplicates = (array) => {
    const { length } = array,
      { size } = new Set(array),
      isNotEqual = length !== size;

    return isNotEqual;
}
