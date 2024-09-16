/**
 * Request a Coinbase Advanced API endpoint by GET method.
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
 * @module request/coinbase/get
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/rest-api-auth/
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders/
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/error-response/
 * @see https://docs.cdp.coinbase.com/sign-in-with-coinbase/docs/status-codes/
 * @see https://developers.coinbase.com/api#versioning 
 */

import config from "../../configuration/coinbase.json" with { type: "json" };
import { signJwt } from "../../lib/authentication.mjs";
import { fetchData, stringifyQuery } from "../../lib/fetch.mjs";
import { dirObject, infoName } from "../../lib/output.mjs";
import { interpolate, supplementary } from "../../lib/string.mjs";
import responseAnalyze from "../../response/coinbase/analyze.mjs";
import responseSnapshot from "../../response/coinbase/snapshot.mjs";
import responseParse from "../../response/coinbase/parse.mjs";
import settings from "../../settings/coinbase.json" with { type: "json" };

const coinbaseGet = async (sign, pathTemplate, data = {}, parse) => {
    const { ENCODING, HOSTNAME, PATH, PREFIX } = config,
      { account, authentication } = settings,
      { wallet } = account,
      { delay, keys, secrets } = authentication,
      key = keys[account[wallet]],
      method = "GET",
      query = stringifyQuery(
        supplementary(pathTemplate, data)
      ),
      secret = secrets[account[wallet]],
      timestamp = Date.now(),
      path = interpolate(pathTemplate, data).split("?")[0],
      payload = {
        exp: Math.floor(timestamp / delay) + 120,
        iss: "cdp",
        nbf: Math.floor(timestamp / delay),
        sub: key,
        uri: method + " " + HOSTNAME + PREFIX + path,
      },
      url = "https://" + HOSTNAME + PREFIX + path + query;
    let headers = {
      "CB-VERSION": "2024-08-20",
    };

    infoName(PATH, pathTemplate);
    if (sign === "JWT") {
      const token = signJwt(ENCODING, payload, secret, key);

      headers = {
        ...headers,
        Authorization: "Bearer " + token,
      };
    };

    let { json, status } = await fetchData(method, url, data, headers),
      report = responseAnalyze(json, status);

    if (report.isResponseSuccessful) {
      /* responseSnapshot(
        responseParse(json, status, path, data), path
      ) */
      responseParse(json, status, pathTemplate, Object.assign(data, parse))
      responseSnapshot(json, pathTemplate)
    } else {
      /** 
       * @todo Status synchronization with `status.json`.
       */
      dirObject(status, json);
      console.info(`Could not parse and snapshot. Response is not successful.`)
    };
    console.info({ report })

    return json;
  };

export default coinbaseGet;
