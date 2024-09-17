/**!
 * Fetch data from a REST API endpoint with parameters.
 *
 * @module lib/fetch
 */

import { HTTP } from './constants.mjs';
import { interpolate, supplementary, toPascalCase } from './string.mjs';

export const componentsGet = (template, data) => {
    const { config, settings } = global.apiTools,
      { HOSTNAME, PREFIX } = config,
      { account, authentication } = settings,
      { wallet } = account,
      { keys } = authentication,
      key = keys[account[wallet]],
      query = stringifyQuery(template, data),
      timestamp = Date.now(),
      path = stringifyPath(template, data),
      url = 'https://' + HOSTNAME + PREFIX + path + query;

    return { key, path, query, timestamp, url };
  },
  componentsPost = (template, data) => {
    const { config, settings } = global.apiTools,
      { HOSTNAME, PREFIX } = config,
      { account, authentication } = settings,
      { wallet } = account,
      { keys } = authentication,
      key = keys[account[wallet]],
      body = JSON.stringify(data),
      timestamp = Date.now(),
      path = stringifyPath(template, data),
      url = 'https://' + HOSTNAME + PREFIX + path;

    return { body, key, path, timestamp, url };
  },
  fetchData = (method, url, data, headers) => {
    const { STATUS } = HTTP,
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

    if (method === 'POST') {
      options.body = JSON.stringify(data);
    }

    return global.fetch(url, options).then(async (response) => {
      const { status, statusText } = response,
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
        json = text || error.message;
      }

      return {
        json,
        headers: entryHeaders(response.headers.entries()),
        status,
        statusText:
          statusText.replaceAll(' ', '_') in STATUS ? statusText : 'Unexpected status text',
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
