/**
 * Snapshot an Bybit API response to a file with current UTC ISO timestamp.
 *
 * @module response/bybit/snapshot
 */

import responseSnapshot from '../snapshot.mjs';

const bybitSnapshot = (json, pathTemplate) => {
  const snapshot = responseSnapshot(json, pathTemplate, 'bybit');

  return snapshot;
};

export default bybitSnapshot;
