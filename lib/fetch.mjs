/**!
 * Fetch data from a REST API endpoint with parameters.
 *
 * @module lib/fetch
 */

import { HTTP } from './constants.mjs';
import { interpolate, supplementary, toPascalCase } from './string.mjs';

export const endpointGet = (template, data) => {
    const { config } = global.apiTools,
      { HOSTNAME, PREFIX } = config,
      query = stringifyQuery(template, data),
      path = stringifyPath(template, data),
      url = 'https://' + HOSTNAME + PREFIX + path + query;

    return { path, query, url };
  },
  endpointPost = (template, data) => {
    const { config } = global.apiTools,
      { HOSTNAME, PREFIX } = config,
      body = JSON.stringify(data),
      path = stringifyPath(template, data),
      url = 'https://' + HOSTNAME + PREFIX + path;

    return { body, path, url };
  },
  fetchData = (method, url, data, headers) => {
    const { METHOD, STATUS } = HTTP,
      timeStart = Date.now(),
      intervalId = global.setInterval(() => {
        process.stdout.write(`\rFetching${'.'.repeat(intervalCount)}`);
        intervalCount++;
      }, 100),
      options = {
        headers,
        method,
      };
    let intervalCount = 0;

    if (method === METHOD.POST) {
      options.body = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    return global.fetch(url, options).then(async (response) => {
      const { status, statusText } = response,
        statusTextUpperCase = statusText.replaceAll(' ', '_').toUpperCase(),
        timeEnd = Date.now(),
        done = ` done in ${timeEnd - timeStart} ms.`,
        eraser = ' '.repeat(intervalCount > done.length ? intervalCount - done.length : 0),
        text = await response.text();
      let json;

      global.clearInterval(intervalId);
      process.stdout.write(`\rFetching${done}${eraser}\n`);
      try {
        json = JSON.parse(text);
      } catch (error) {
        json = (text || error.message) + ': ' + statusText;
      }

      return {
        json,
        headers: entryHeaders(response.headers.entries()),
        status,
        statusText:
          statusTextUpperCase in STATUS
            ? statusTextUpperCase
            : (Object.entries(STATUS).find((item) => item[1] === status)[0] ??
              'Unexpected status text'),
      };
    });
  },
  entryHeaders = (entries) => {
    /**
     * Create new shallow-copied array from Headers iterator object to map lower cased header keys.
     */
    const array = Array.from(entries, ([key, value]) => [toPascalCase(key), value]),
      headers = Object.fromEntries(array);

    return headers;
  },
  stringifyPath = (template, data) => {
    const path = interpolate(template, data).split('?')[0];

    return path;
  },
  stringifyQuery = (template, data) => {
    const params = supplementary(template, data),
      query = Object.keys(params).length ? '?' + String(new URLSearchParams(params)) : '';

    return query;
  };
