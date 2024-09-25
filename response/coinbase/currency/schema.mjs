/**
 * Currency related JSON-schema for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/currency/schema
 */

const currency = {
  properties: {
    asset_id: { type: 'string' },
    code: { type: 'string' },
    name: { type: 'string' },
  },
  required: ['asset_id', 'code', 'name'],
  type: 'object',
};

export const currencyAll = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { items: currency, minItems: 1, type: 'array' },
  },
  required: ['data'],
  type: 'object',
};

export const currencyOne = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { items: currency, minItems: 1, type: 'array' },
  },
  required: ['data'],
  type: 'object',
};
