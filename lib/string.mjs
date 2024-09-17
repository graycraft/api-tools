/**!
 * String related methods for common application use cases.
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
  const result = Object.keys(expressions).reduce((accum, key) => 
    (template.match(/{[A-z_]+}/g)?.includes("{" + key + "}") ? accum[key] = expressions[key] : accum, accum)
   , {})

 return result
}

/**
 * Interpolate a string as template literal.
 * @param {string} template String as template literal.
 * @param {object} expressions Expressions to be embedded within a template.
 * @returns {string} Interpolated string.
 */
export const interpolate = (template, expressions) => {
  const result = template.replace(/\${[^}]+}/g, (match) => expressions[match.slice(2, -1)]);

  return result
}

/**
 * Find supplementary expressions (not found in a template).
 * @param {string} template String as template literal.
 * @param {object} expressions Expressions to be embedded within a template.
 * @returns {object} Supplementary expressions.
 */
export const supplementary = (template, expressions) => {
  const result = Object.keys(expressions).reduce((accum, key) => 
    (!template.match(/{[A-z_]+}/g)?.includes("{" + key + "}") ? accum[key] = expressions[key] : accum, accum)
   , {})

 return result
}

export const toPascalCase = (string) => {
  const result = string.replace(/\w+/g, (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase()
  );

  return result;
}
