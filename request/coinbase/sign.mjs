/**
 * Sign a Coinbase Advanced API request with specified authentication signature scheme.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth
 * @see https://developers.coinbase.com/api#versioning
 * @typedef {import("#types/common.d.js").Dict} Dict
 * @module request/coinbase/sign
 */

import { blind, signJwt } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';

let timestamp;

/**
 * Retrieve public key and timestamp for Coinbase Advanced API request.
 * @returns {{ key: string, timestamp: number }} Public key.
 */
export const coinbaseKey = () => {
  const { settings } = global.apiTools.coinbase,
    { authentication, user } = settings,
    { portfolio } = user,
    { keys } = authentication,
    key = keys[user[portfolio].uuid];

  /** Timestamp must be fresh for every request from an API flow. */
  timestamp = Date.now();

  return { key, timestamp };
};

/**
 * Retrieve secret key for Coinbase Advanced API request.
 * @returns {string} Secret key.
 */
export const coinbaseSecret = () => {
  const { settings } = global.apiTools.coinbase,
    { authentication, user } = settings,
    { portfolio } = user,
    { secrets } = authentication,
    secret = secrets[user[portfolio].uuid];

  return secret;
};

/**
 * Sign a request for Coinbase Advanced API by specified authentication security method.
 * @param {"GET" | "POST"} method HTTP method to submit the request with.
 * @param {Dict} title Endpoint title to output.
 * @param {"JWT" | null} security Authentication signature security.
 * @param {string} key Endpoint path template to be interpolated.
 * @param {object} payload JSON-schema to validate response with.
 * @param {object} [data] Data to send with request.
 * @returns {object} JSON data from response.
 */
export const coinbaseSign = (method, title, security, key, payload, data = {}) => {
  const { config } = global.apiTools.coinbase,
    { ENCODING } = config,
    secret = coinbaseSecret();
  let headers = {
    /**
     * Some methods, e.g. `/v2/accounts/${account_uuid}/addresses` suggests to supply additional header:
     * {
     *   CREATED: {
     *     ...,
     *     warnings: [
     *       {
     *         id: 'missing_version',
     *         message: 'Please supply API version (YYYY-MM-DD) as CB-VERSION header',
     *         url: 'https://developers.coinbase.com/api#versioning'
     *       }
     *     ]
     *   }
     * }
     */
    'CB-VERSION': '2024-08-20',
  };

  global.apiTools.output = title;
  if (security === AUTH.SECURITY.JWT) {
    const token = signJwt(ENCODING, payload, secret, key);

    headers = {
      ...headers,
      Authorization: 'Bearer ' + token,
    };
    global.apiTools.output[method] = {
      headers: {
        ...headers,
        Authorization: blind(token),
      },
      data,
    };
  } else {
    global.apiTools.output[method] = {
      headers,
      data,
    };
  }

  return headers;
};
