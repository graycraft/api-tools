/**
 * Snapshot an Coinbase Advanced API response to a file with current UTC ISO timestamp.
 *
 * @module response/bybit/snapshot
 */

import responseSnapshot from '../snapshot.mjs';

const coinbaseSnapshot = (json, pathTemplate) => {
  const snapshot = responseSnapshot(json, pathTemplate, 'coinbase');

  return snapshot;
};

export default coinbaseSnapshot;
