/**!
 * Fetch data from an endpoint with parameters.
 * 
 * @module lib/fetch
 */

import { blind } from "./authentication.mjs";
import { dirObject } from "./output.mjs";
import { toPascalCase } from "./string.mjs";

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
        global.clearInterval(intervalId);

        const timeEnd = Date.now(),
          done = ` done in ${timeEnd - timeStart} ms.`,
          eraser = " ".repeat(intervalCount > done.length ? intervalCount - done.length : 0);

        process.stdout.write(`\rFetching${done}${eraser}\n`);
        dirObject("Response headers", entryHeaders(response));

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
  entryHeaders = (response) => {
    const entries = response.headers.entries(),
      /**
       * Create new shallow-copied Array instance from Headers iterator object to map lower cased header keys.
       */
      array = Array.from(entries, ([key, value]) => [toPascalCase(key), value]),
      headers = Object.fromEntries(array)

    return headers
  },
  stringifyQuery = (data) => {
    const query = Object.keys(data).length ? "?" + String(new URLSearchParams(data)) : "";

    return query
  };
