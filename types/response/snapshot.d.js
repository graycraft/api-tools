/**
 * JSON data structure to output and make snapshots.
 *
 * @typedef {import("#lib/constants.mjs").AuthSecurity} AuthSecurity
 * @typedef {import("#lib/constants.mjs").HttpMethod} HttpMethod
 * @typedef {import("#lib/constants.mjs").HttpStatusText} HttpStatusText
 * @typedef {import("#types/common.d.js").Dict} Dict
 * @typedef {{
 *   [key: string]: string;
 * } & {
 *   [key in AuthSecurity]: {
 *     encoding: string;
 *     key: string;
 *     payload: Dict;
 *     secret: string;
 *     token: string;
 *   };
 * } & {
 *   [key in HttpMethod]: {
 *     headers: Dict;
 *     data: Dict;
 *   };
 * } & {
 *   [key in HttpStatusText]: {
 *     headers: Dict;
 *     json: Dict;
 *   };
 * }} default
 */
