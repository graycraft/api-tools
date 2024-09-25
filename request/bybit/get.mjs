/**
 * Request a Bybit API endpoint by the `GET` method.
 *
 * @see https://bybit-exchange.github.io/docs/v5/guide
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 * @module request/bybit/get
 */

import { HTTP } from '#lib/constants.mjs';
import { endpointGet } from '#lib/fetch.mjs';
import { dirObject } from '#lib/output.mjs';
import { obtainName } from '#lib/utility.mjs';
import parse from '#res/bybit/parse.mjs';
import snapshot from '#res/bybit/snapshot.mjs';

import { bybitKey, bybitSign } from './sign.mjs';
import get from '../get.mjs';

/**
 * @param {string} template Path template to be interpolated.
 * @param {object} schema JSON-schema to validate response with.
 * @param {"HMAC" | "RSA" | null} [security] Authentication signature security.
 * @param {object} [data] Data to send with request.
 * @returns {Promise<object>} JSON data from response.
 */
const bybitGet = async (template, schema, security, data = {}) => {
  const { config, settings } = global.apiTools,
    {
      METHOD: { GET },
    } = HTTP,
    { PATH } = config,
    {
      authentication: { delay },
      verbose,
    } = settings,
    { query, url } = endpointGet(template, data),
    { key, timestamp } = bybitKey(),
    payload = timestamp + key + delay + query.slice(1);

  global.apiTools.output = { [obtainName(template, PATH)]: url };

  const headers = bybitSign(GET, security, key, payload, data),
    json = await get(
      url,
      template,
      headers,
      schema,
      {
        parse,
        snapshot,
      },
      data,
    );

  if (verbose) dirObject('Snapshot', global.apiTools.output);

  return json;
};

export default bybitGet;
