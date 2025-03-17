/**
 * Request an API endpoint by the `GET` method.
 *
 * @typedef {import("#lib/fetch.mjs").RFetch} RFetch
 * @typedef {import("#types/api.ts").default} IApi
 * @typedef {import("./index.mjs").DCallback} Callback
 * @module request/get
 */

import { HTTP } from '#lib/constants.mjs';

import request from './index.mjs';

/**
 * Analyze, validate, parse and snapshot response data.
 * @param {IApi} api A specific API configuration, name, preferences, settings and status.
 * @param {string} url URL to send request.
 * @param {string} template Endpoint path template to be interpolated.
 * @param {{}} headers Headers to send with request.
 * @param {{}} schema JSON-schema to validate response with.
 * @param {Callback} callback Utility callback functions to process response data.
 * @param {{}} [data] Data to send with request.
 * @returns {Promise<RFetch["json"]>} JSON data from response.
 */
const requestGet = async (api, url, template, headers, schema, callback, data = {}) => {
  const {
      METHOD: { GET },
    } = HTTP,
    response = await request(GET, api, url, template, headers, schema, callback, data);

  return response;
};

export default requestGet;
