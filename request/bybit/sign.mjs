/**
 * Sign a Bybit API request with specified authentication signature scheme.
 *
 * @see https://bybit-exchange.github.io/docs/v5/guide
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 * @module request/bybit/sign
 */

import { blind, signHmac } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';

let timestamp;

export const bybitKey = () => {
  const { settings } = global.apiTools,
    { account, authentication } = settings,
    { wallet } = account,
    { keys } = authentication,
    key = keys[account[wallet]];

  /** Timestamp must be fresh for every request from an API flow. */
  timestamp = Date.now();

  return { key, timestamp };
};

export const bybitSecret = () => {
  const { settings } = global.apiTools,
    { account, authentication } = settings,
    { wallet } = account,
    { secrets } = authentication,
    secret = secrets[account[wallet]];

  return secret;
};

/**
 * @param {"GET" | "POST"} method HTTP method to submit the request with.
 * @param {"HMAC" | "RSA" | null} security Authentication signature security.
 * @param {string} key Path template to be interpolated.
 * @param {object} payload JSON-schema to validate response with.
 * @param {object} [data] Data to send with request.
 * @returns {object} JSON data from response.
 */
export const bybitSign = (method, security, key, payload, data = {}) => {
  const { config, settings } = global.apiTools,
    { ENCODING } = config,
    {
      authentication: { delay },
    } = settings,
    secret = bybitSecret();
  let headers = {};

  if (security === AUTH.SECURITY.HMAC) {
    const digest = signHmac(ENCODING, payload, secret, key);

    headers = {
      'X-BAPI-API-KEY': key,
      'X-BAPI-RECV-WINDOW': delay,
      'X-BAPI-SIGN': digest,
      'X-BAPI-SIGN-TYPE': 2,
      'X-BAPI-TIMESTAMP': timestamp,
    };
    global.apiTools.output[method] = {
      headers: {
        ...headers,
        'X-BAPI-API-KEY': blind(key, 'mask'),
        'X-BAPI-SIGN': blind(digest, 'mask'),
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
