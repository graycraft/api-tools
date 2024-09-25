/**
 * Request an API endpoint by the `GET` method.
 *
 * @module request/get
 */

import { HTTP } from '#lib/constants.mjs';
import request from '../request.mjs';

/**
 * Analyze, validate, parse and snapshot response data.
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
const requestGet = async (url, template, headers, schema, callback, data = {}) => {
  const {
      METHOD: { GET },
    } = HTTP,
    response = await request(GET, url, template, headers, schema, callback, data);

  return response;
};

export default requestGet;
