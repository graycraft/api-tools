/**
 * Address related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @version 2025-02-01
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/address/schema
 */

import collection from '#cllctn/coinbase/address_all.json' with { type: 'json' };
import config from '#config/coinbase.json' with { type: 'json' };
import { composePattern } from '#lib/regexp.mjs';

const address = {
    additionalProperties: false,
    allOf: [
      {
        if: { properties: { network: { const: 'bitcoin' } } },
        then: {
          properties: {
            address: { pattern: composePattern('BTC_ADDRESS'), type: 'string' },
          },
        },
      },
      {
        if: { properties: { network: { const: 'ethereum' } } },
        then: {
          properties: {
            address: { pattern: composePattern('EVM_ADDRESS'), type: 'string' },
          },
        },
      },
      {
        if: { properties: { network: { const: 'solana' } } },
        then: {
          properties: {
            address: { pattern: composePattern('SOL_ADDRESS'), type: 'string' },
          },
        },
      },
    ],
    properties: {
      address: {},
      created_at: {
        pattern: composePattern('DATE_ISO_MS'),
        type: 'string',
      },
      currency: {
        enum: collection.map((item) => item.currency),
        type: 'string',
      },
      id: {
        pattern: composePattern('UUID'),
        type: 'string',
      },
      name: { type: ['null', 'string'] },
      network: {
        enum: collection.map((item) => item.network),
        type: 'string',
      },
      resource: {
        enum: ['addresses'],
        type: 'string',
      },
      resource_path: {
        pattern: composePattern(
          {
            account_uuid: 'UUID',
            address_uuid: 'UUID',
          },
          config.PATH.ADDRESS_ONE,
        ),
        type: 'string',
      },
      updated_at: {
        pattern: composePattern('DATE_ISO_MS'),
        type: 'string',
      },
    },
    required: [
      'address',
      'currency',
      'created_at',
      'id',
      'network',
      'resource',
      'resource_path',
      'updated_at',
    ],
    type: 'object',
  },
  pagination = {
    additionalProperties: false,
    properties: {
      ending_before: { type: ['null', 'string'] },
      limit: { type: 'number' },
      order: { enum: ['asc', 'desc'], type: 'string' },
      starting_after: { type: ['null', 'string'] },
    },
    required: ['limit', 'order'],
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
    pagination,
  },
  required: ['data', 'pagination'],
  type: 'object',
};

export const addressNew = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: address,
    pagination,
  },
  required: ['data'],
  type: 'object',
};

export const addressOne = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    data: address,
    pagination,
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
        additionalProperties: false,
        properties: {
          amount: {
            additionalProperties: false,
            properties: {
              amount: { type: 'string' },
              currency: { enum: collection.map((item) => item.currency), type: 'string' },
            },
            required: ['amount', 'currency'],
            type: 'object',
          },
          created_at: {
            pattern: composePattern('DATE_ISO_MS'),
            type: 'string',
          },
          description: { type: ['null', 'string'] },
          from: {
            additionalProperties: false,
            properties: {
              id: {
                pattern: composePattern('UUID'),
                type: 'string',
              },
              resource: { enum: ['user'], type: 'string' },
            },
            required: ['id', 'resource'],
            type: 'object',
          },
          id: {
            pattern: composePattern('UUID'),
            type: 'string',
          },
          native_amount: {
            additionalProperties: false,
            properties: {
              amount: { type: 'string' },
              currency: { enum: collection.map((item) => item.currency), type: 'string' },
            },
            required: ['amount', 'currency'],
            type: 'object',
          },
          network: {
            additionalProperties: false,
            properties: {
              name: { enum: collection.map((item) => item.network), type: 'string' },
              status: { enum: ['off_blockchain'], type: 'string' },
            },
            required: ['name', 'status'],
            type: 'object',
          },
          resource: { enum: ['transaction'], type: 'string' },
          resource_path: {
            pattern: composePattern(
              {
                account_uuid: 'UUID',
                address_uuid: 'UUID',
              },
              config.PATH.ADDRESS_TRANSACTIONS,
            ),
            type: 'string',
          },
          status: { enum: ['completed'], type: 'string' },
          type: {
            enum: ['advanced_trade_fill', 'buy', 'request', 'transfer', 'send'],
            type: 'string',
          },
          updated_at: {
            pattern: composePattern('DATE_ISO_MS'),
            type: 'string',
          },
        },
        required: ['id', 'network', 'status', 'type'],
        type: 'object',
      },
      minItems: 0,
      type: 'array',
    },
    pagination,
  },
  required: ['pagination'],
  type: 'object',
};
