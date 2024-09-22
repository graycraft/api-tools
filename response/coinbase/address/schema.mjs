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
    data: { type: 'array' },
    pagination: { type: 'object' },
  },
  required: ['data', 'pagination'],
  type: 'object',
};

export const addressNew = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { type: 'object' },
  },
  required: ['data'],
  type: 'object',
};

export const addressOne = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { type: 'object' },
  },
  required: ['data'],
  type: 'object',
};

export const addressTransactions = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    data: { type: 'array' },
    pagination: { type: 'object' },
  },
  required: ['data'],
  type: 'object',
};
