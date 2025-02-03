/**
 * Deposit related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/withdraw/schema
 */

const data = {
  properties: {
    amount: {
      properties: {
        amount: { type: 'string' },
        currency: { type: 'string' },
      },
      type: 'object',
    },
    created_at: { type: 'string' },
    id: { type: 'string' },
    native_amount: {
      properties: {
        amount: { type: 'string' },
        currency: { type: 'string' },
      },
      type: 'object',
    },
    network: {
      properties: {
        hash: { type: 'string' },
        network_name: { type: 'string' },
        status: { type: 'string' },
      },
      type: 'object',
    },
    resource: { type: 'string' },
    resource_path: { type: 'string' },
    status: { type: 'string' },
    type: { type: 'string' },
  },
  required: [
    'amount',
    'created_at',
    'id',
    'native_amount',
    'resource',
    'resource_path',
    'status',
    'type',
  ],
  type: 'object',
};

export const withdrawAll = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: {
      items: data,
      minItems: 1,
      type: 'array',
    },
    pagination: { type: 'object' },
  },
  required: ['data', 'pagination'],
  type: 'object',
};
export const withdrawOne = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data,
  },
  required: ['data'],
  type: 'object',
};
export const withdrawNew = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: {
      ...data,
      properties: {
        ...data.properties,
        idem: { type: 'string' },
        to: { type: 'string' },
      },
    },
    pagination: { type: 'object' },
  },
  required: ['data', 'pagination'],
  type: 'object',
};
