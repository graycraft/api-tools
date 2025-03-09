/**
 * Sign a Bybit API request with specified authentication signature scheme.
 *
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 * @typedef {import("#types/common.ts").Dict} Dict
 * @module request/bybit/sign
 */

import { blind, signHmac } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';
import { dirObject } from '#lib/output.mjs';

let timestamp;

/**
 * Retrieve public key and timestamp for Bybit API request.
 * @returns {{ key: string, timestamp: number }} Public key.
 */
export const bybitKey = () => {
  const { settings } = global.apiTools.bybit,
    { account, authentication } = settings,
    { wallet } = account,
    { keys } = authentication,
    key = keys[account[wallet]];

  /** Timestamp must be fresh for every request from an API flow. */
  timestamp = Date.now();

  return { key, timestamp };
};

/**
 * Retrieve secret key for Bybit API request.
 * @returns {string} Secret key.
 */
export const bybitSecret = () => {
  const { settings } = global.apiTools.bybit,
    { account, authentication } = settings,
    { wallet } = account,
    { secrets } = authentication,
    secret = secrets[account[wallet]];

  return secret;
};

/**
 * Sign a request for Bybit API by specified authentication security method.
 * @param {"GET" | "POST"} method HTTP method to submit the request with.
 * @param {Dict} title Endpoint title to output.
 * @param {"HMAC" | "RSA" | null} security Authentication signature security.
 * @param {string} key Endpoint path template to be interpolated.
 * @param {object} payload JSON-schema to validate response with.
 * @param {object} [data] Data to send with request.
 * @returns {object} JSON data from response.
 */
export const bybitSign = (method, title, security, key, payload, data = {}) => {
  const { prefs, settings } = global.apiTools.bybit,
    { debug } = prefs,
    {
      authentication: { delay },
    } = settings,
    secret = bybitSecret();

  let headers = {
    'X-BAPI-RECV-WINDOW': delay,
    'X-BAPI-TIMESTAMP': timestamp,
  };

  global.apiTools.output = title;

  if (security === AUTH.SECURITY.HMAC) {
    const digest = signHmac('hex', payload, secret, key);

    if (debug) {
      dirObject('Signature', { digest, key, payload, secret, timestamp });
    }

    headers = {
      ...headers,
      'X-BAPI-API-KEY': key,
      'X-BAPI-SIGN': digest,
      'X-BAPI-SIGN-TYPE': 2,
    };
    global.apiTools.output[method] = {
      headers: {
        ...headers,
        'X-BAPI-API-KEY': blind(key),
        'X-BAPI-SIGN': blind(digest),
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
