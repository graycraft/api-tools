/**
 * Sign a Coinbase Advanced API request with specified authentication signature scheme.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth
 * @module request/coinbase/sign
 */

import { blind, signJwt } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';

let timestamp;

/**
 * @returns {{ key: string, timestamp: number }}
 */
export const coinbaseKey = () => {
  const { settings } = global.apiTools,
    { authentication, user } = settings,
    { portfolio } = user,
    { keys } = authentication,
    key = keys[user[portfolio].uuid];

  /** Timestamp must be fresh for every request from an API flow. */
  timestamp = Date.now();

  return { key, timestamp };
};

/**
 * @returns {string}
 */
export const coinbaseSecret = () => {
  const { settings } = global.apiTools,
    { authentication, user } = settings,
    { portfolio } = user,
    { secrets } = authentication,
    secret = secrets[user[portfolio].uuid];

  return secret;
};

/**
 * Sign a request for Coinbase Advanced API by specified authentication security method.
 * @param {"GET" | "POST"} method HTTP method to submit the request with.
 * @param {"JWT" | null} security Authentication signature security.
 * @param {string} key Path template to be interpolated.
 * @param {object} payload JSON-schema to validate response with.
 * @param {object} [data] Data to send with request.
 * @returns {object}
 */
export const coinbaseSign = (method, security, key, payload, data = {}) => {
  const { config } = global.apiTools,
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
