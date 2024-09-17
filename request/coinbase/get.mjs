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

import get from '../get.mjs';
import config from '../../configuration/coinbase.json' with { type: 'json' };
import { blind, signJwt } from '../../lib/authentication.mjs';
import { HTTP } from '../../lib/constants.mjs';
import { stringifyQuery } from '../../lib/fetch.mjs';
import { dirObject } from '../../lib/output.mjs';
import { interpolate, supplementary } from '../../lib/string.mjs';
import { obtainName } from '../../lib/utility.mjs';
import analyze from '../../response/coinbase/analyze.mjs';
import parse from '../../response/coinbase/parse.mjs';
import snapshot from '../../response/coinbase/snapshot.mjs';
import settings from '../../settings/coinbase.json' with { type: 'json' };

/**
 * @param {"JWT" | null} sign Authentication method.
 * @param {string} template Path template to be interpolated.
 * @param {object} [data] Data to send with request.
 * @param {object} [schema] JSON-schema to validate response with.
 * @returns {Promise<object>} JSON data from response.
 */
const coinbaseGet = async (sign, template, data = {}, schema = {}) => {
  const {
      METHOD: { GET },
    } = HTTP,
    { ENCODING, HOSTNAME, PATH, PREFIX } = config,
    { account, authentication } = settings,
    { wallet } = account,
    { delay, keys, secrets } = authentication,
    key = keys[account[wallet]],
    query = stringifyQuery(supplementary(template, data)),
    secret = secrets[account[wallet]],
    timestamp = Date.now(),
    path = interpolate(template, data).split('?')[0],
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      uri: GET + ' ' + HOSTNAME + PREFIX + path,
    },
    url = 'https://' + HOSTNAME + PREFIX + path + query;
  let headers = {
    /**
     * Some methods, e.g. `/v2/accounts/${account_uuid}/addresses` suggests to supply additional header:
     * {
     *   CREATED: {
     *     ...,
     *     warnings: [
     *       {
     *         id: 'missing_version',
     *         message: 'Please supply API version (YYYY-MM-DD) as CB-VERSION header',
     *         url: 'https://developers.coinbase.com/api#versioning'
     *       }
     *     ]
     *   }
     * }
     */
    'CB-VERSION': '2024-08-20',
  };

  console.info({ [obtainName(template, PATH)]: url });
  if (sign) {
    const token = signJwt(ENCODING, payload, secret, key);

    headers = {
      ...headers,
      Authorization: 'Bearer ' + token,
    };
    dirObject(GET, {
      headers: {
        ...headers,
        Authorization: blind(token),
      },
      data,
    });
  } else {
    dirObject(GET, {
      headers,
      data,
    });
  }

  const json = get(
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

export default coinbaseGet;
