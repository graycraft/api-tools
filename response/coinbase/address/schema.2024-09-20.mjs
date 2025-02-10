/**
 * Address related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @version 2024-09-20
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
            address_info: {
              properties: {
                address: {
                  pattern: composePattern('BTC_ADDRESS'),
                  type: 'string',
                },
              },
              type: 'object',
            },
            deposit_uri: {
              pattern: composePattern({ btc_address: 'BTC_ADDRESS' }, 'bitcoin:${btc_address}'),
              type: 'string',
            },
          },
        },
      },
      {
        if: { properties: { network: { const: 'ethereum' } } },
        then: {
          properties: {
            address: { pattern: composePattern('EVM_ADDRESS'), type: 'string' },
            address_info: {
              properties: {
                address: {
                  pattern: composePattern('EVM_ADDRESS'),
                  type: 'string',
                },
              },
              type: 'object',
            },
            deposit_uri: {
              pattern: composePattern({ evm_address: 'EVM_ADDRESS' }, 'ethereum:${evm_address}'),
              type: 'string',
            },
          },
        },
      },
      {
        if: { properties: { network: { const: 'solana' } } },
        then: {
          properties: {
            address: { pattern: composePattern('SOL_ADDRESS'), type: 'string' },
            address_info: {
              properties: {
                address: {
                  pattern: composePattern('SOL_ADDRESS'),
                  type: 'string',
                },
              },
              type: 'object',
            },
            deposit_uri: {
              pattern: composePattern({ sol_address: 'SOL_ADDRESS' }, 'solana:${sol_address}'),
              type: 'string',
            },
          },
        },
      },
    ],
    properties: {
      address: {},
      address_info: {
        additionalProperties: false,
        properties: {
          address: {},
        },
        required: ['address'],
        type: 'object',
      },
      address_label: { type: 'string' },
      callback_url: { type: ['null', 'string'] },
      created_at: {
        pattern: composePattern('DATE_ISO'),
        type: 'string',
      },
      currency: {
        enum: collection.map((item) => item.currency),
        type: 'string',
      },
      default_receive: { type: 'boolean' },
      deposit_uri: {},
      id: {
        pattern: composePattern('UUID'),
        type: 'string',
      },
      inline_warning: {
        additionalProperties: false,
        properties: {
          text: { type: 'string' },
          tooltip: {
            additionalProperties: false,
            properties: {
              subtitle: { type: 'string' },
              title: { type: 'string' },
            },
            required: ['subtitle', 'title'],
            type: 'object',
          },
        },
        required: ['text', 'tooltip'],
        type: 'object',
      },
      launch_warning: {
        additionalProperties: false,
        properties: {
          cta: {
            properties: {
              text: { type: 'string' },
            },
            required: ['text'],
            type: 'object',
          },
          hyperlink: {
            properties: {
              text: { type: 'string' },
              url: {
                pattern: composePattern('URI'),
                type: 'string',
              },
            },
            required: ['text', 'url'],
            type: 'object',
          },
          subtitle: { type: 'string' },
          title: { type: 'string' },
        },
        required: ['cta', 'hyperlink', 'subtitle', 'title'],
        type: 'object',
      },
      name: { type: ['null', 'string'] },
      network: {
        enum: collection.map((item) => item.network),
        type: 'string',
      },
      qr_code_image_url: {
        pattern: composePattern('URI'),
        type: 'string',
      },
      receive_subtitle: { type: ['null', 'string'] },
      resource: {
        enum: ['address'],
        type: 'string',
      },
      resource_path: {
        pattern: composePattern(
          {
            account_uuid: 'UUID',
            address_uuid: 'UUID',
          },
          '/' + config.PATH.ADDRESS_ONE,
        ),
        type: 'string',
      },
      share_address_copy: {
        additionalProperties: false,
        properties: {
          line1: { type: 'string' },
          line2: { type: 'string' },
        },
        required: ['line1', 'line2'],
        type: 'object',
      },
      updated_at: {
        pattern: composePattern('DATE_ISO'),
        type: 'string',
      },
      uri_scheme: {
        enum: collection.map((item) => item.network),
        type: 'string',
      },
      warnings: {
        items: {
          additionalProperties: false,
          properties: {
            details: { type: 'string' },
            image_url: {
              pattern: composePattern('URI'),
              type: 'string',
            },
            options: {
              items: {
                additionalProperties: false,
                properties: {
                  id: { type: 'string' },
                  style: { type: 'string' },
                  text: { type: 'string' },
                },
                required: ['id', 'style', 'text'],
                type: 'object',
              },
              minItems: 1,
              type: 'array',
            },
            title: { type: 'string' },
            type: { type: 'string' },
          },
          required: ['details', 'image_url', 'options', 'title', 'type'],
          type: 'object',
        },
        minItems: 1,
        type: 'array',
      },
    },
    required: [
      'address',
      'address_info',
      'address_label',
      'callback_url',
      'created_at',
      'default_receive',
      'deposit_uri',
      'id',
      'inline_warning',
      'network',
      'qr_code_image_url',
      'receive_subtitle',
      'resource',
      'resource_path',
      'share_address_copy',
      'updated_at',
      'uri_scheme',
      'warnings',
    ],
    type: 'object',
  },
  pagination = {
    additionalProperties: false,
    properties: {
      ending_before: { type: ['null', 'string'] },
      limit: { type: 'number' },
      next_starting_after: {
        pattern: composePattern('UUID'),
        type: ['null', 'string'],
      },
      next_uri: { type: ['null', 'string'] },
      order: { enum: ['asc', 'desc'], type: 'string' },
      previous_ending_before: { type: ['null', 'string'] },
      previous_uri: { type: ['null', 'string'] },
      starting_after: { type: ['null', 'string'] },
    },
    required: [
      'ending_before',
      'limit',
      'next_starting_after',
      'next_uri',
      'order',
      'previous_ending_before',
      'previous_uri',
      'starting_after',
    ],
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
            pattern: composePattern('DATE_ISO'),
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
            pattern: composePattern('DATE_ISO'),
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
