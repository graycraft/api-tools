/**
 * Request a Bybit API endpoint by the `GET` method.
 *
 * @see https://bybit-exchange.github.io/docs/v5/guide
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 * @module request/bybit/get
 */

import sign from './sign.mjs';
import get from '../get.mjs';
import { HTTP } from '../../lib/constants.mjs';
import { componentsGet } from '../../lib/fetch.mjs';
import { infoPath } from '../../lib/output.mjs';
import analyze from '../../response/bybit/analyze.mjs';
import parse from '../../response/bybit/parse.mjs';
import snapshot from '../../response/bybit/snapshot.mjs';

/**
 * @param {string} template Path template to be interpolated.
 * @param {object} schema JSON-schema to validate response with.
 * @param {"HMAC" | "RSA" | null} [security] Authentication signature security.
 * @param {object} [data] Data to send with request.
 * @returns {Promise<object>} JSON data from response.
 */
const bybitGet = async (template, schema, security, data = {}) => {
  const {
      METHOD: { GET },
    } = HTTP,
    { config, settings } = global.apiTools,
    { PATH } = config,
    { authentication } = settings,
    { delay } = authentication,
    { key, query, timestamp, url } = componentsGet(template, data),
    payload = timestamp + key + delay + query.slice(1);

  infoPath(template, PATH, url);

  const headers = sign(GET, security, key, timestamp, payload, data),
    json = get(
      url,
      template,
      headers,
      schema,
      {
        analyze,
        parse,
        snapshot,
      },
      data,
    );

  return json;
};

export default bybitGet;
