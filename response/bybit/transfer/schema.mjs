/**
 * Transfer related JSON-schemas for Bybit API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/bybit/network/schema
 */

export const transferAll = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    retCode: { type: 'number' },
    retExtInfo: { type: 'object' },
    retMsg: { type: 'string' },
    result: { type: 'object' },
    time: { type: 'number' },
  },
  required: ['result', 'retCode', 'retMsg'],
  type: 'object',
};

export const transferInternal = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    retCode: { type: 'number' },
    retExtInfo: { type: 'object' },
    retMsg: { type: 'string' },
    result: { type: 'object' },
    time: { type: 'number' },
  },
  required: ['result', 'retCode', 'retMsg'],
  type: 'object',
};

export const transferOne = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    retCode: { type: 'number' },
    retExtInfo: { type: 'object' },
    retMsg: { type: 'string' },
    result: { type: 'object' },
    time: { type: 'number' },
  },
  required: ['result', 'retCode', 'retMsg'],
  type: 'object',
};
