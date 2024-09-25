/**
 * Request an API endpoint by the `POST` method.
 *
 * @module request/post
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
const requestPost = async (url, template, headers, schema, callback, data = {}) => {
  const {
      METHOD: { POST },
    } = HTTP,
    response = await request(POST, url, template, headers, schema, callback, data);

  return response;
};

export default requestPost;
