/**!
 * Commonly used template literals for dynamic formatting.
 *
 * @module library/template
 */

/**
 * Format template of fallback message for request parameters validation.
 * @param {string} param String to format template with.
 * @returns {string} Formatted string.
 */
export const fallback = (param) => `Falling back to "${param}". `;

/**
 * Format template of invalid message for request parameters validation.
 * @param {string} param String to format template with.
 * @returns {string} Formatted string.
 */
export const invalid = (param) => `Parameter \`${param}\` is not valid. `;

/**
 * Format template of optional message for request parameters validation.
 * @param {string} param String to format template with.
 * @returns {string} Formatted string.
 */
export const optional = (param) => `Optional parameter \`${param}\` is not valid. `;

/**
 * Format template of required message for request parameters validation.
 * @param {string} param String to format template with.
 * @returns {string} Formatted string.
 */
export const required = (param) => `Required parameter \`${param}\` is not valid or undefined. `;
