/**
 * JSON data structure to output and make snapshots.
 *
 * @typedef {import("#lib/constants.mjs").AuthSecurity} AuthSecurity
 * @typedef {import("#lib/constants.mjs").HttpMethod} HttpMethod
 * @typedef {import("#lib/constants.mjs").HttpStatusText} HttpStatusText
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {{
 *   [key: string]: string;
 * } & {
 *   [key in AuthSecurity]: {
 *     encoding: string;
 *     key: string;
 *     payload: dictionary;
 *     secret: string;
 *     token: string;
 *   };
 * } & {
 *   [key in HttpMethod]: {
 *     headers: dictionary;
 *     data: dictionary;
 *   };
 * } & {
 *   [key in HttpStatusText]: {
 *     headers: dictionary;
 *     json: dictionary;
 *   };
 * }} default
 */
