/**
 * Request a Coinbase Advanced API endpoint by `GET` method.
 *
 * @typedef {import("#types/response/coinbase.d.js").default} Response
 * @module request/coinbase/get
 */

import { HTTP } from '#lib/constants.mjs';
import { endpointGet } from '#lib/fetch.mjs';
import { dirSnapshot } from '#lib/output.mjs';
import { exitProcess } from '#lib/utility.mjs';
import parse from '#res/coinbase/parse.mjs';
import snapshot from '#res/coinbase/snapshot.mjs';

import { coinbaseKey, coinbaseSign } from './sign.mjs';
import get from '../get.mjs';

/**
 * @param {string} template Endpoint path template to be interpolated.
 * @param {{}} schema JSON-schema to validate response with.
 * @param {"JWT" | null} [security] Authentication signature security.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<Response>} JSON data from response.
 */
const coinbaseGet = async (template, schema, security, data = {}) => {
  const { coinbase, options } = global.apiTools,
    { config, prefs, settings } = coinbase,
    {
      METHOD: { GET },
    } = HTTP,
    { HOSTNAME, PREFIX } = config,
    {
      authentication: { delay },
    } = settings,
    { endpoint, path, url } = endpointGet(config, template, data),
    { key, timestamp } = coinbaseKey(),
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      uri: GET + ' ' + HOSTNAME + PREFIX + path,
    },
    title = { [endpoint]: url },
    headers = coinbaseSign(GET, title, security, key, payload, data),
    json = await get(
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
  exitProcess(json, options, prefs);

  return json;
};

export default coinbaseGet;
