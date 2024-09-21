/**
 * Currency related JSON-schema for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/currency/schema
 */

export const currencyAll = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { type: 'array' },
  },
  required: ['data'],
  type: 'object',
};

export const currencyOne = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { type: 'array' },
  },
  required: ['data'],
  type: 'object',
};
