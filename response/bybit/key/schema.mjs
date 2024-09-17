/**
 * Key related JSON-schema for Bybit API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/bybit/deposit/schema
 */

export const keyInformation = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    retCode: { type: 'number' },
    retExtInfo: { type: 'object' },
    retMsg: { type: 'string' },
    result: { type: 'object' },
    time: { type: 'number' },
  },
  required: ['result', 'retCode', 'retExtInfo', 'retMsg', 'time'],
  type: 'object',
};
