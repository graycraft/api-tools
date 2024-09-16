/**
 * Fetch data from an endpoint with parameters.
 * 
 * @module lib/fetch
 */

import { hide } from "./authentication.mjs";
import { dirObject } from "./output.mjs";

export const fetchData = (method, url, data, headers) => {
    const authn = headers.Authorization,
      options = {
        headers,
        method,
      };

    if (method === "POST") {
      options.body = JSON.stringify(data);
    }
    dirObject(method, {
      data,
      headers: authn ? {
        ...headers,
        Authorization: hide(authn),
      } : headers,
      url
    });
    console.info("Fetching\u2026");

    return global.fetch(url, options)
      .then(async (response) => {
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

        return { json, status: response.status }
      })
  },
  stringifyQuery = (data) => {
    const query = Object.keys(data).length ? "?" + String(new URLSearchParams(data)) : "";

    return query
  };
