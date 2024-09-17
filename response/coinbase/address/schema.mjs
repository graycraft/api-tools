/**
 * Address related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/address/schema
 */

export const addressAll = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    breakdown: { type: 'object' },
  },
  required: ['breakdown'],
  type: 'object',
};
