/**!
 * Fetch data from a REST API endpoint with parameters.
 *
 * @typedef {import("./constants.mjs").HttpStatusCode} HttpStatusCode
 * @typedef {import("./constants.mjs").HttpStatusText} HttpStatusText
 * @typedef {Object<string, string>} Dict
 * @typedef RFetch
 * @prop {Dict} headers Response headers.
 * @prop {object} json Response JSON.
 * @prop {HttpStatusCode} status HTTP status code.
 * @prop {HttpStatusText} statusText HTTP status text.
 * @module library/fetch
 */

import { HTTP } from './constants.mjs';
import { interpolate, supplementary, toPascalCase } from './string.mjs';
import { obtainName } from './utility.mjs';

/**
 * Assemble endpoint parts for a `GET` request.
 * @param {{ HOSTNAME: string, PATH: Dict, PREFIX: string }} config A specific API configuration.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {Dict} data Data to embed in path and build query string from.
 * @returns {{
 *   endpoint: string;
 *   path: string;
 *   query: string;
 *   url: string;
 * }} Endpoint parts.
 */
export const endpointGet = (config, template, data) => {
  const { PROTOCOL } = HTTP,
    { HOSTNAME, PATH, PREFIX } = config,
    endpoint = obtainName(template, PATH),
    query = stringifyQuery(template, data),
    path = stringifyPath(template, data),
    url = PROTOCOL + HOSTNAME + PREFIX + path + query;

  return { endpoint, path, query, url };
};

/**
 * Assemble endpoint parts for a `POST` request.
 * @param {{ HOSTNAME: string, PATH: Dict, PREFIX: string }} config A specific API configuration.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {Dict} data Data to embed in path and build request body string from.
 * @returns {{
 *   body: string;
 *   endpoint: string;
 *   path: string;
 *   url: string;
 * }} Endpoint parts.
 */
export const endpointPost = (config, template, data) => {
  const { PROTOCOL } = HTTP,
    { HOSTNAME, PATH, PREFIX } = config,
    body = JSON.stringify(data),
    endpoint = obtainName(template, PATH),
    path = stringifyPath(template, data),
    url = PROTOCOL + HOSTNAME + PREFIX + path;

  return { body, endpoint, path, url };
};

/**
 * Fetch data from an endpoint.
 * @param {"GET" | "POST"} method HTTP request method.
 * @param {string} url Endpoint URL.
 * @param {Dict} headers Request headers.
 * @param {Dict} data Data to send. For a `GET` request, this must be embedded in the URL.
 * @returns {Promise<RFetch>} Response data.
 */
export const fetchData = (method, url, headers, data) => {
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
    const { status, statusText } = /** @type {{ status: HttpStatusCode; statusText }} */ (response),
      statusTextUpperCase = statusText.replace(' ', '_').toUpperCase(),
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
      headers: entryHeaders(response.headers.entries()),
      json,
      status,
      statusText:
        statusTextUpperCase in STATUS
          ? statusTextUpperCase
          : (Object.entries(STATUS).find((item) => item[1] === status)[0] ??
            'Unexpected status text'),
    };
  });
};

/**
 * Transform Headers iterator object to a plain request headers object.
 * @param {HeadersIterator<[string, string]>} entries Headers iterator object.
 * @returns {Dict} Plain request headers object.
 */
export const entryHeaders = (entries) => {
  /**
   * Create new shallow-copied array from Headers iterator object to map lower cased header keys.
   */
  const array = Array.from(entries, ([key, value]) => [toPascalCase(key), value]),
    headers = Object.fromEntries(array);

  return headers;
};

/**
 * Embed appropriate request data to a path template.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {object} data Request data.
 * @returns {string} Interpolated endpoint path.
 */
export const stringifyPath = (template, data) => {
  const path = interpolate(template, data).split('?')[0];

  return path;
};

/**
 * Build URL query string from a request data.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {object} data Request data.
 * @returns {string} Query string with search parameters.
 */
export const stringifyQuery = (template, data) => {
  const params = supplementary(template, data),
    query = Object.keys(params).length ? '?' + String(new URLSearchParams(params)) : '';

  return query;
};
