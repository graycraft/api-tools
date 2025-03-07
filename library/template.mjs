/**!
 * Commonly used template literals for dynamic filling.
 *
 * @module library/template
 */

export const fallback = (param) => `Falling back to "${param}". `;
export const invalid = (param) => `Parameter \`${param}\` is not valid. `;
export const optional = (param) => `Optional parameter \`${param}\` is not valid. `;
export const required = (param) => `Required parameter \`${param}\` is not valid or undefined. `;
