/**
 * Market related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/market/schema
 */

export const history = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    best_ask: { type: 'string' },
    best_bid: { type: 'string' },
    trades: { type: 'array' },
  },
  required: ['best_ask', 'best_bid'],
  type: 'object',
};

export default history;
