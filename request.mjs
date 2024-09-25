/**
 * Request an API endpoint by the specified method.
 *
 * @module request
 */

import { fetchData } from '#lib/fetch.mjs';
import analyze from './response/analyze.mjs';
import validate from './response/validate.mjs';

/**
 * Analyze, validate, parse and snapshot response data.
 * @param {"GET" | "POST"} method URL to send request.
 * @param {string} url URL to send request.
 * @param {string} template Path template to be interpolated.
 * @param {object} headers Headers to send with request.
 * @param {object} schema JSON-schema to validate response with.
 * @param {{
 *   parse: function,
 *   snapshot: function
 * }} callback Utility callback functions to process response data.
 * @param {object} [data] Data to send with request.
 * @returns {Promise<object>} JSON data from response.
 */
const request = async (method, url, template, headers, schema, callback, data = {}) => {
  const response = await fetchData(method, url, data, headers),
    responseParsed = callback.parse(response, template, data),
    { json } = response,
    { jsonParsed, statusText } = responseParsed,
    { isKnown, isSaved, isSuccessful } = analyze(responseParsed),
    isValid = validate(response.json, schema);

  global.apiTools.output[statusText] = {
    headers: response.headers,
    json: jsonParsed,
  };
  if (isSuccessful) {
    if (isValid) {
      callback.snapshot(
        {
          ...global.apiTools.output,
          [statusText]: {
            ...global.apiTools.output[statusText],
            json,
          },
        },
        template,
      );
    } else {
      console.info('Snapshot:', 'response is not valid.');
      console.info('Parse:', 'response is not valid.');
    }
  } else {
    console.info(
      'Status:',
      `code is${isKnown ? '' : ' not'} known, description is${isSaved ? '' : ' not'} saved.`,
    );
    console.info('Snapshot:', 'response is not successful.');
    console.info('Parse:', 'response is not successful.');
  }

  return json;
};

export default request;
