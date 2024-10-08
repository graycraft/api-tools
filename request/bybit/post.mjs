/**
 * Request a Bybit API endpoint by the `POST` method.
 *
 * @typedef {import("#types/response/bybit.d.js").default} Response
 * @module request/bybit/post
 */

import { HTTP } from '#lib/constants.mjs';
import { endpointPost } from '#lib/fetch.mjs';
import { dirSnapshot } from '#lib/output.mjs';
import parse from '#res/bybit/parse.mjs';
import snapshot from '#res/bybit/snapshot.mjs';

import { bybitKey, bybitSign } from './sign.mjs';
import post from '../post.mjs';

/**
 * @param {string} template Endpoint path template to be interpolated.
 * @param {{}} schema JSON-schema to validate response with.
 * @param {"HMAC" | "RSA" | null} [security] Authentication signature security.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<Response>} JSON data from response.
 */
const bybitPost = async (template, schema, security, data = {}) => {
  const { bybit, options } = global.apiTools,
    { config, prefs, settings } = bybit,
    {
      METHOD: { POST },
    } = HTTP,
    {
      authentication: { delay },
    } = settings,
    { body, endpoint, url } = endpointPost(config, template, data),
    { key, timestamp } = bybitKey(),
    payload = timestamp + key + delay + body,
    title = { [endpoint]: url },
    headers = bybitSign(POST, title, security, key, payload, data),
    json = await post(
      global.apiTools.bybit,
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

  dirSnapshot(endpoint, options, prefs, global.apiTools.output);

  return json;
};

export default bybitPost;
