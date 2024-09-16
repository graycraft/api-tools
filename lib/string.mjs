/**!
 * String related methods for common application wide use cases.
 *
 * @format
 */

/**
 * Find complementary expressions (found in a template).
 * @param {string} template String as template literal.
 * @param {object} expressions Expressions to be embedded within a template.
 * @returns {object} Complementary expressions.
 */
export const complementary = (template, expressions) => {
  const complementaryExpressions = Object.keys(expressions).reduce((accum, key) => 
    (template.match(/{[A-z_]+}/g)?.includes("{" + key + "}") ? accum[key] = expressions[key] : accum, accum)
   , {})

 return complementaryExpressions
}

/**
 * Find supplementary expressions (not found in a template).
 * @param {string} template String as template literal.
 * @param {object} expressions Expressions to be embedded within a template.
 * @returns {object} Supplementary expressions.
 */
export const supplementary = (template, expressions) => {
  const supplementaryExpressions = Object.keys(expressions).reduce((accum, key) => 
    (!template.match(/{[A-z_]+}/g)?.includes("{" + key + "}") ? accum[key] = expressions[key] : accum, accum)
   , {})

 return supplementaryExpressions
}

/**
 * Interpolate a string as template literal.
 * @param {string} template String as template literal.
 * @param {object} expressions Expressions to be embedded within a template.
 * @returns {string} Interpolated string.
 */
export const interpolate = (template, expressions) => {
  const interpolatedString = template.replace(/\${[^}]+}/g, (match) => expressions[match.slice(2, -1)]);

  return interpolatedString
}

/**
 * Splice (remove or replace) characters from a string and/or adding new characters.
 * The method results differ from the native array splice for edge cases.
 *
 * @public
 * @param {string} str Source string to be spliced.
 * @param {number} [start] Index at which to start splicing.
 * @param {number} [count] Number of characters in string to remove from start.
 * @param {string} [chars] Characters to add to string, beginning from start.
 * @returns {string} Spliced string.
 */
export function splice(str, start = 0, count = 0, chars = "") {
  return str.slice(0, start) + chars + str.slice(start + count);
}

export default {
  encodeToDataUri,
  formatGroup,
  interpolate,
  splice,
};