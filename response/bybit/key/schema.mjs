/**
 * Key related JSON-schema for Bybit API response structure.
 *
 * @todo Describe JSON-schemas.
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/bybit/key/schema
 */

export const keyInformation = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    result: { type: 'object' },
    retCode: { type: 'number' },
    retExtInfo: { type: 'object' },
    retMsg: { type: 'string' },
    time: { type: 'number' },
  },
  required: ['result', 'retCode', 'retExtInfo', 'retMsg', 'time'],
  type: 'object',
};
