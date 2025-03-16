/**
 * Request an API endpoint by the `POST` method.
 *
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#types/api.ts").default} IApi
 * @typedef {import("./index.mjs").Callback} Callback
 * @module request/post
 */

import { HTTP } from '#lib/constants.mjs';

import request from './index.mjs';

/**
 * Analyze, validate, parse and snapshot response data.
 * @param {IApi} api A specific API configuration, name, preferences, settings and status.
 * @param {string} url URL to send request.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {object} headers Headers to send with request.
 * @param {object} schema JSON-schema to validate response with.
 * @param {Callback} callback Utility callback functions to process response data.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<RFetch["json"]>} JSON data from response.
 */
const requestPost = async (api, url, template, headers, schema, callback, data = {}) => {
  const {
      METHOD: { POST },
    } = HTTP,
    response = await request(POST, api, url, template, headers, schema, callback, data);

  return response;
};

export default requestPost;
