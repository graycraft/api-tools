/**
 * Request a Coinbase Advanced API endpoint by `GET` method.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth/
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders/
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/error-response/
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/status-codes/
 * @see https://developers.coinbase.com/api#versioning
 * @module request/coinbase/get
 */

import { coinbaseKey, coinbaseSign } from './sign.mjs';
import get from '../get.mjs';
import { HTTP } from '../../lib/constants.mjs';
import { endpointGet } from '../../lib/fetch.mjs';
import { dirObject } from '../../lib/output.mjs';
import { obtainName } from '../../lib/utility.mjs';
import parse from '../../response/coinbase/parse.mjs';
import snapshot from '../../response/coinbase/snapshot.mjs';

/**
 * @param {string} template Path template to be interpolated.
 * @param {object} schema JSON-schema to validate response with.
 * @param {"JWT" | null} [security] Authentication signature security.
 * @param {object} [data] Data to send with request.
 * @returns {Promise<object>} JSON data from response.
 */
const coinbaseGet = async (template, schema, security, data = {}) => {
  const { config, settings } = global.apiTools,
    {
      METHOD: { GET },
    } = HTTP,
    { HOSTNAME, PATH, PREFIX } = config,
    {
      authentication: { delay },
    } = settings,
    { path, url } = endpointGet(template, data),
    { key, timestamp } = coinbaseKey(),
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      uri: GET + ' ' + HOSTNAME + PREFIX + path,
    };

  global.apiTools.output = { [obtainName(template, PATH)]: url };

  const headers = coinbaseSign(GET, security, key, payload, data),
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

  dirObject('JSON', global.apiTools.output);

  return json;
};

export default coinbaseGet;
