/**
 * Request a Coinbase Advanced API endpoint by POST method.
 * Some methods, e.g. `/v2/accounts/${account_uuid}/addresses` suggests to supply additional header:
 * '201': {
 *   ...,
 *   warnings: [
 *     {
 *       id: 'missing_version',
 *       message: 'Please supply API version (YYYY-MM-DD) as CB-VERSION header',
 *       url: 'https://developers.coinbase.com/api#versioning'
 *     }
 *   ]
 * }
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth/
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders/
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/error-response/
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/status-codes/
 * @module request/coinbase/post
 */

import { coinbaseKey, coinbaseSign } from './sign.mjs';
import post from '../post.mjs';
import { HTTP } from '../../lib/constants.mjs';
import { endpointPost } from '../../lib/fetch.mjs';
import { dirObject } from '../../lib/output.mjs';
import { obtainName } from '../../lib/utility.mjs';
import analyze from '../../response/coinbase/analyze.mjs';
import parse from '../../response/coinbase/parse.mjs';
import snapshot from '../../response/coinbase/snapshot.mjs';

const coinbasePost = async (template, schema, security, data = {}) => {
  const { config, settings, timestamp } = global.apiTools,
    {
      METHOD: { POST },
    } = HTTP,
    { HOSTNAME, PATH, PREFIX } = config,
    {
      authentication: { delay },
    } = settings,
    { path, url } = endpointPost(template, data),
    key = coinbaseKey(),
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      uri: POST + ' ' + HOSTNAME + PREFIX + path,
    };

  global.apiTools.output[obtainName(template, PATH)] = url;

  const headers = coinbaseSign(POST, security, key, payload, data),
    json = await post(
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

  dirObject('JSON', global.apiTools.output);

  return json;
};

export default coinbasePost;
