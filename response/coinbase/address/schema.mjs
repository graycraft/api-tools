/**
 * Address related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/address/schema
 */

const address = {
  properties: {
    address: { type: 'string' },
    id: { type: 'string' },
    network: { type: 'string' },
  },
  required: ['address', 'id', 'network'],
  type: 'object',
};

export const addressAll = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: {
      items: address,
      minItems: 1,
      type: 'array',
    },
    pagination: { type: 'object' },
  },
  required: ['data', 'pagination'],
  type: 'object',
};

export const addressNew = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: address,
  },
  required: ['data'],
  type: 'object',
};

export const addressOne = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: address,
    pagination: { type: 'object' },
  },
  required: ['data'],
  type: 'object',
};

export const addressTransactions = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: {
      items: {
        properties: {
          id: { type: 'string' },
          network: {
            properties: {
              name: { enum: ['bitcoin', 'ethereum'], type: 'string' },
              status: { enum: ['off_blockchain'], type: 'string' },
            },
            required: ['name', 'status'],
            type: 'object',
          },
          status: { enum: ['completed'], type: 'string' },
          type: { enum: ['send'], type: 'string' },
        },
        required: ['id', 'network', 'status', 'type'],
        type: 'object',
      },
      minItems: 0,
      type: 'array',
    },
    pagination: { type: 'object' },
  },
  required: ['data'],
  type: 'object',
};
