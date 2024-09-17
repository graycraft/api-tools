/**
 * Request an API endpoint by the `GET` method.
 *
 * @module request/get
 */

import { HTTP } from '../lib/constants.mjs';
import { fetchData } from '../lib/fetch.mjs';
import { dirObject } from '../lib/output.mjs';
import validate from '../response/validate.mjs';

/**
 * @param {string} url URL to send request.
 * @param {string} template Path template to be interpolated.
 * @param {object} headers Headers to send with request.
 * @param {object} schema JSON-schema to validate response with.
 * @param {{
 *   analyze: function,
 *   parse: function,
 *   snapshot: function
 * }} utilities Utility functions to process response data.
 * @param {object} [data] Data to send with request.
 * @returns {Promise<object>} JSON data from response.
 */
const requestGet = async (
  url,
  template,
  headers,
  schema,
  { analyze, parse, snapshot },
  data = {},
) => {
  const {
    METHOD: { GET },
  } = HTTP;
  let response = await fetchData(GET, url, data, headers),
    { json, statusText } = response,
    { isCodeDescribed, isCodeKnown, isSuccessful } = analyze(response),
    isValid = validate(json, schema);

  if (isSuccessful) {
    if (isValid) {
      const parsed = parse(response, template, data);

      snapshot(json, template);
      json = parsed.json;
      statusText = parsed.statusText;
    } else {
      console.info('Snapshot:', 'response is not valid.');
      console.info('Parse:', 'response is not valid.');
    }
  } else {
    /**
     * @todo Status synchronization with `status.json`.
     */
    console.info('isCodeDescribed:', isCodeDescribed);
    console.info('isCodeKnown:', isCodeKnown);
    console.info('Snapshot:', 'response is not successful.');
    console.info('Parse:', 'response is not successful.');
  }
  dirObject(statusText, {
    headers: response.headers,
    json,
  });

  return json;
};

export default requestGet;
