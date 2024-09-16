/**!
 * Fetch data from an endpoint with parameters.
 * 
 * @module lib/fetch
 */

import { blind } from "./authentication.mjs";
import { dirObject } from "./output.mjs";

export const fetchData = (method, url, data, headers) => {
    const headerAuth = headers.Authorization,
    timeStart = Date.now(),
      intervalId = global.setInterval(() => {
        process.stdout.write(`\rFetching${".".repeat(intervalCount)}`);
        intervalCount++;
      }, 100),
      options = {
        headers,
        method,
      };
    let intervalCount = 0;

    if (method === "POST") {
      options.body = JSON.stringify(data);
    }
    dirObject(method, {
      data,
      headers: headerAuth ? {
        ...headers,
        Authorization: blind(headerAuth),
      } : headers,
      url
    });

    return global.fetch(url, options)
      .then(async (response) => {
        const timeEnd = Date.now()

        global.clearInterval(intervalId);
        process.stdout.write(`\rFetching done in ${timeEnd - timeStart} ms.\n`);

        const text = await response.text();
        let json;

        try {
          json = JSON.parse(text);
        } catch (error) {
          /* json = {
            result: {},
            retCode: -1,
            retMsg: text || error.message
          }; */
          json = text || error.message;
        }

        return {
          json,
          status: response.status,
          statusText: response.statusText
         }
      })
  },
  stringifyQuery = (data) => {
    const query = Object.keys(data).length ? "?" + String(new URLSearchParams(data)) : "";

    return query
  };
