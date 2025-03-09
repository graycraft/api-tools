/**
 * Snapshot a Bybit API response to a file with current UTC ISO timestamp.
 *
 * @typedef {import("#types/api.ts").default} Api
 * @typedef {import("#types/response/snapshot.js").default} Snapshot
 * @typedef {import("../snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/snapshot
 */

import responseSnapshot from '../snapshot.mjs';

/**
 * Snapshot a Bybit API response.
 * @param {Api} api A specific API configuration, name, preferences, settings and status.
 * @param {Snapshot} output Information about request and response to output.
 * @param {string} endpoint Endpoint name.
 * @returns {RSnapshot} File data to write in a specific API's snapshot directory.
 */
const bybitSnapshot = (api, output, endpoint) => {
  const snapshot = responseSnapshot(api, output, endpoint);

  return snapshot;
};

export default bybitSnapshot;
