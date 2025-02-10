/**
 * Request an API endpoint by the specified method.
 *
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#res/parse.mjs").ResponseParse} ResponseParse
 * @typedef {import("#res/parse.mjs").RParseStatus} RParseStatus
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @typedef {import("#types/api.d.js").Api} Api
 * @typedef {import("#types/response/snapshot.d.js").default} Snapshot
 * @typedef {{
 *   parse: (response: RFetch, endpoint: string, data: {}) => ResponseParse & RParseStatus;
 *   snapshot: (api: Api, output: Snapshot, endpoint: string) => RSnapshot;
 * }} Callback
 * @module request/index
 */

import { fetchData } from '#lib/fetch.mjs';
import { obtainName } from '#lib/utility.mjs';
import analyze from '#res/analyze.mjs';
import validate from '#res/validate.mjs';

/**
 * Analyze, validate, parse and snapshot response data.
 * @param {"GET" | "POST"} method URL to send request.
 * @param {Api} api A specific API configuration, name, preferences, settings and status.
 * @param {string} url URL to send request.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {{}} headers Headers to send with request.
 * @param {{}} schema JSON-schema to validate response with.
 * @param {Callback} callback Utility callback functions to process response data.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<RFetch["json"]>} JSON data from response.
 */
const request = async (method, api, url, template, headers, schema, callback, data = {}) => {
  const { PATH } = api.config,
    endpoint = obtainName(template, PATH),
    response = await fetchData(method, url, headers, data),
    responseParsed = callback.parse(response, endpoint, data),
    { json } = response,
    { jsonParsed, statusText } = responseParsed,
    { isKnown, isSaved, isSuccessful } = analyze(api, responseParsed),
    isValid = validate(response.json, schema, api.name);

  global.apiTools.output[statusText] = {
    headers: response.headers,
    json: jsonParsed ?? json,
  };
  if (isSuccessful) {
    if (isValid) {
      callback.snapshot(
        api,
        /** @type {Snapshot} */ ({
          ...global.apiTools.output,
          [statusText]: {
            ...global.apiTools.output[statusText],
            json,
          },
        }),
        endpoint,
      );
    } else {
      console.info('Snapshot:', 'response is not valid.');
      console.info('Parse:', 'response is not valid.');
      global.apiTools.options.flow = 'exit';
      global.apiTools.options.verbose = true;
    }
  } else {
    console.info(
      'Status:',
      `code is${isKnown ? '' : ' not'} known, description is${isSaved ? '' : ' not'} saved.`,
    );
    console.info('Snapshot:', 'response is not successful.');
    console.info('Parse:', 'response is not successful.');
    global.apiTools.options.flow = 'exit';
    global.apiTools.options.verbose = true;
  }

  return json;
};

export default request;
