/**
 * Request a Coinbase Advanced API endpoint by the `POST` method.
 *
 * @typedef {import("#types/response/coinbase.d.js").default} Response
 * @module request/coinbase/post
 */

import { HTTP } from '#lib/constants.mjs';
import { endpointPost } from '#lib/fetch.mjs';
import { dirSnapshot } from '#lib/output.mjs';
import parse from '#res/coinbase/parse.mjs';
import snapshot from '#res/coinbase/snapshot.mjs';

import { coinbaseKey, coinbaseSign } from './sign.mjs';
import post from '../post.mjs';

/**
 * @param {string} template Endpoint path template to be interpolated.
 * @param {{}} schema JSON-schema to validate response with.
 * @param {"JWT" | null} [security] Authentication signature security.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<Response>} JSON data from response.
 */
const coinbasePost = async (template, schema, security, data = {}) => {
  const { coinbase, options } = global.apiTools,
    { config, prefs, settings } = coinbase,
    {
      METHOD: { POST },
    } = HTTP,
    { HOSTNAME, PREFIX } = config,
    {
      authentication: { delay },
    } = settings,
    { endpoint, path, url } = endpointPost(config, template, data),
    { key, timestamp } = coinbaseKey(),
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      uri: POST + ' ' + HOSTNAME + PREFIX + path,
    },
    title = { [endpoint]: url },
    headers = coinbaseSign(POST, title, security, key, payload, data),
    json = await post(
      global.apiTools.coinbase,
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

export default coinbasePost;
