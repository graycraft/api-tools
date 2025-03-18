/**
 * JSON data structure to output and make snapshots.
 *
 * @typedef {import("#lib/constants.mjs").authSecurity} authSecurity
 * @typedef {import("#lib/constants.mjs").httpMethod} httpMethod
 * @typedef {import("#lib/constants.mjs").httpStatusText} httpStatusText
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {{
 *   [key: string]: string;
 * } & {
 *   [key in authSecurity]: {
 *     encoding: string;
 *     key: string;
 *     payload: dictionary;
 *     secret: string;
 *     token: string;
 *   };
 * } & {
 *   [key in httpMethod]: {
 *     headers: dictionary;
 *     data: dictionary;
 *   };
 * } & {
 *   [key in httpStatusText]: {
 *     headers: dictionary;
 *     json: dictionary;
 *   };
 * }} default
 */
