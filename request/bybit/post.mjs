/**
 * Request a Bybit API endpoint by POST method.
 * 
 * @module request/bybit/post
 * @see https://bybit-exchange.github.io/docs/v5/guide
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.js
 * @see https://github.com/bybit-exchange/api-usage-examples/blob/master/V5_demo/api_demo/Encryption_HMAC.ts
 */

import config from "../../configuration/bybit.json" with { type: "json" };
import settings from "../../settings/bybit.json" with { type: "json" };
import { fetchData } from "../../lib/fetch.mjs";
import { signHmac } from "../../lib/authentication.mjs";
import { dirObject, infoName } from "../../lib/output.mjs";
import responseAnalyze from "../../response/bybit/analyze.mjs";
import responseParse from "../../response/bybit/parse.mjs";

const bybitPost = async (sign, pathTemplate, data = {}) => {
    const { ENCODING, HOSTNAME, PATH, PREFIX } = config,
      { account, authentication } = settings,
      { wallet } = account,
      { delay, hidden, keys, secrets } = authentication,
      key = keys[account[wallet]],
      body = JSON.stringify(data),
      method = "POST",
      secret = secrets[account[wallet]],
      timestamp = Date.now(),
      path = interpolate(pathTemplate, data).split("?")[0],
      payload = timestamp + key + delay + body,
      url = "https://" + HOSTNAME + PREFIX + path;
    let headers = {
      "Content-Type": "application/json; charset=utf-8"
    };

    infoName(PATH, pathTemplate);
    if (sign === "HMAC") {
      const digest = signHmac(ENCODING, payload, secret, hidden);

      headers = {
        ...headers,
        "X-BAPI-API-KEY": key,
        "X-BAPI-RECV-WINDOW": delay,
        "X-BAPI-SIGN": digest,
        "X-BAPI-SIGN-TYPE": 2,
        "X-BAPI-TIMESTAMP": timestamp
      };
    };

    let { json, status } = await fetchData(method, url, data, headers),
      report = responseAnalyze(json, status);

    if (report.isResponseSuccessful) {
      /* responseSnapshot(
        responseParse(json, status, path, data), path
      ) */
      responseParse(json, status, pathTemplate, data)
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

export default bybitPost;
