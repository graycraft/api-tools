/**
 * Sign a Bybit API request with specified authentication signature scheme.
 *
 * @see https://bybit-exchange.github.io/docs/v5/guide
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 * @module request/bybit/sign
 */

import { blind, signHmac } from '../../lib/authentication.mjs';
import { dirObject } from '../../lib/output.mjs';

/**
 * @param {"GET" | "POST"} method HTTP method to submit the request with.
 * @param {"HMAC" | "RSA" | null} security Authentication signature security.
 * @param {string} key Path template to be interpolated.
 * @param {number} timestamp Path template to be interpolated.
 * @param {object} payload JSON-schema to validate response with.
 * @param {object} [data] Data to send with request.
 * @returns {object} JSON data from response.
 */
const bybitSign = (method, security, key, timestamp, payload, data = {}) => {
  const { config, settings } = global.apiTools,
    { ENCODING } = config,
    { account, authentication } = settings,
    { wallet } = account,
    { delay, secrets } = authentication,
    secret = secrets[account[wallet]];
  let headers = {};

  if (security === 'HMAC') {
    const digest = signHmac(ENCODING, payload, secret, key);

    headers = {
      'X-BAPI-API-KEY': key,
      'X-BAPI-RECV-WINDOW': delay,
      'X-BAPI-SIGN': digest,
      'X-BAPI-SIGN-TYPE': 2,
      'X-BAPI-TIMESTAMP': timestamp,
    };
    dirObject(method, {
      headers: {
        ...headers,
        'X-BAPI-API-KEY': blind(key, 'mask'),
        'X-BAPI-SIGN': blind(digest, 'mask'),
      },
      data,
    });
  } else {
    dirObject(method, {
      headers,
      data,
    });
  }

  return headers;
};

export default bybitSign;
