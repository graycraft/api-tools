/**
 * User related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/user/schema
 */

export const userAccountAll = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    accounts: { type: 'array' },
    cursor: { type: 'string' },
    has_next: { type: 'boolean' },
    size: { type: 'number' },
  },
  required: ['accounts', 'cursor', 'has_next', 'size'],
  type: 'object',
};
export const userAccountOne = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    account: { type: 'object' },
  },
  required: ['account'],
  type: 'object',
};

export const userPortfolioAll = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    portfolios: { type: 'array' },
  },
  required: ['portfolios'],
  type: 'object',
};

export const userPortfolioOne = {
  // "$schema": "https://json-schema.org/draft/2020-12/schema",
  additionalProperties: false,
  properties: {
    breakdown: { type: 'object' },
  },
  required: ['breakdown'],
  type: 'object',
};
