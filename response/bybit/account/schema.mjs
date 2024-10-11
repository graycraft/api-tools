/**
 * Account related JSON-schema for Bybit API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/bybit/account/schema
 */

export const accountInformation = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    result: { type: 'object' },
    retCode: { type: 'number' },
    retMsg: { type: 'string' },
  },
  required: ['result', 'retCode', 'retMsg'],
  type: 'object',
};

export const accountWallets = {
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
