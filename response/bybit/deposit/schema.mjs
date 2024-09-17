/**
 * Deposit related JSON-schema for Bybit API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/bybit/deposit/schema
 */

export const depositAll = {
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

export const depositNewMaster = {
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

export const depositNewSub = {
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

export const depositOne = {
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
