/**
 * Sign a Coinbase Advanced API request with specified authentication signature scheme.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth
 * @see https://developers.coinbase.com/api#versioning
 * @typedef {import("#lib/authentication.mjs").JwtPayload} Payload
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @module request/coinbase/sign
 */

import { blind, signJwt } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';
import { dirObject } from '#lib/output.mjs';

/** @type {number} */
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
 * @param {{ [key: string]: {}; }} title Endpoint title to output.
 * @param {"JWT" | null} security Authentication signature security.
 * @param {string} key Endpoint path template to be interpolated.
 * @param {Payload} payload Payload to sign.
 * @param {object} [data] Data to send with request.
 * @returns {object} JSON data from response.
 */
export const coinbaseSign = (method, title, security, key, payload, data = {}) => {
  const { prefs } = global.apiTools.coinbase,
    { debug } = prefs,
    secret = coinbaseSecret();

  /** @type {dictionary} */
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
    const token = signJwt('hex', payload, secret, key);

    if (debug) {
      dirObject('Signature', { key, payload, secret, timestamp, token });
    }

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
