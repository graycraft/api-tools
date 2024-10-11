/**
 * Transaction related JSON-schema for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/transaction/schema
 */

export const transactionAll = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: { type: 'array' },
    pagination: { type: 'object' },
  },
  required: ['data', 'pagination'],
  type: 'object',
};

export const transactionOne = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: { type: 'object' },
  },
  required: ['data'],
  type: 'object',
};
