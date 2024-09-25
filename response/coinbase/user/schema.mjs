/**
 * User related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/user/schema
 */

import config from '#config/coinbase.json' with { type: 'json' };

const {
  USER: { PORTFOLIO },
} = config;

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
    breakdown: {
      additionalProperties: false,
      properties: {
        futures_positions: { type: 'array' },
        perp_positions: { type: 'array' },
        portfolio: {
          properties: {
            type: {
              enum: PORTFOLIO,
              type: 'string',
            },
            uuid: { type: 'string' },
          },
          required: ['type', 'uuid'],
          type: 'object',
        },
        portfolio_balances: { type: 'object' },
        spot_positions: {
          items: {
            properties: {
              account_uuid: { type: 'string' },
              asset: { type: 'string' },
              asset_uuid: { type: 'string' },
            },
            required: ['account_uuid', 'asset', 'asset_uuid'],
            type: 'object',
          },
          minItems: 1,
          type: 'array',
        },
      },
      required: ['portfolio', 'portfolio_balances', 'spot_positions'],
      type: 'object',
    },
  },
  required: ['breakdown'],
  type: 'object',
};
