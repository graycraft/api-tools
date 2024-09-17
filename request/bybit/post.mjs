/**
 * Request a Bybit API endpoint by `POST` method.
 *
 * @see https://bybit-exchange.github.io/docs/v5/guide
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 * @module request/bybit/post
 */

import sign from './sign.mjs';
import post from '../post.mjs';
import { HTTP } from '../../lib/constants.mjs';
import { componentsPost } from '../../lib/fetch.mjs';
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
const bybitPost = async (template, schema, security, data = {}) => {
  const {
      METHOD: { POST },
    } = HTTP,
    { config, settings } = global.apiTools,
    { PATH } = config,
    { authentication } = settings,
    { delay } = authentication,
    { body, key, timestamp, url } = componentsPost(template, data),
    payload = timestamp + key + delay + body;

  infoPath(template, PATH, url);

  const headers = sign(POST, security, key, timestamp, payload, data),
    json = post(
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

export default bybitPost;
