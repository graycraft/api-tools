/**
 * Request a Bybit API endpoint by the `GET` method.
 *
 * @typedef {import("#types/response/bybit.d.js").default} Response
 * @module request/bybit/get
 */

import { HTTP } from '#lib/constants.mjs';
import { endpointGet } from '#lib/fetch.mjs';
import { dirSnapshot } from '#lib/output.mjs';
import { exitProcess } from '#lib/utility.mjs';
import parse from '#res/bybit/parse.mjs';
import snapshot from '#res/bybit/snapshot.mjs';

import { bybitKey, bybitSign } from './sign.mjs';
import get from '../get.mjs';

/**
 * @param {string} template Endpoint path template to be interpolated.
 * @param {{}} schema JSON-schema to validate response with.
 * @param {"HMAC" | "RSA" | null} [security] Authentication signature security.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<Response>} JSON data from response.
 */
const bybitGet = async (template, schema, security, data = {}) => {
  const { bybit, options } = global.apiTools,
    { config, prefs, settings } = bybit,
    {
      METHOD: { GET },
    } = HTTP,
    {
      authentication: { delay },
    } = settings,
    { endpoint, query, url } = endpointGet(config, template, data),
    { key, timestamp } = bybitKey(),
    payload = timestamp + key + delay + query.slice(1),
    title = { [endpoint]: url },
    headers = bybitSign(GET, title, security, key, payload, data),
    json = await get(
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
  exitProcess(json, options, prefs);

  return json;
};

export default bybitGet;
