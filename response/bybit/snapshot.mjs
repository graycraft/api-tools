/**
 * Snapshot a Bybit API response to a file with current UTC ISO timestamp.
 *
 * @typedef {import("#types/api.d.js").Api} Api
 * @typedef {import("#types/response/coinbase.d.js").default} Response
 * @typedef {import("../snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/snapshot
 */

import responseSnapshot from '../snapshot.mjs';

/**
 * Snapshot a Bybit API response.
 * @param {Api} api A specific API configuration, name, preferences, settings and status.
 * @param {Response} json JSON data from a response.
 * @param {string} endpoint Endpoint name.
 * @returns {RSnapshot} File data to write in a specific API's snapshot directory.
 */
const bybitSnapshot = (api, json, endpoint) => {
  const snapshot = responseSnapshot(api, json, endpoint);

  return snapshot;
};

export default bybitSnapshot;
