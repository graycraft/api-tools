/**
 * Order related JSON-schema for Coinbase Advanced API response structure.
 *
 * @todo Describe JSON-schemas.
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/order/schema
 */

export const orderAll = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    cursor: { type: 'string' },
    has_next: { type: 'boolean' },
    orders: { type: 'array' },
    sequence: { type: 'string' },
  },
  required: ['cursor', 'has_next', 'orders', 'sequence'],
  type: 'object',
};

export const orderBook = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    pricebook: { type: 'object' },
    last: { type: 'string' },
    mid_market: { type: 'string' },
    spread_bps: { type: 'string' },
    spread_absolute: { type: 'string' },
  },
  required: ['pricebook'],
  type: 'object',
};

export const orderCancel = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    results: { type: 'array' },
  },
  required: ['results'],
  type: 'object',
};

export const orderLimitBuy = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    order_configuration: { type: 'object' },
    success: { type: 'boolean' },
    success_response: { type: 'object' },
  },
  required: ['order_configuration', 'success', 'success_response'],
  type: 'object',
};

export const orderLimitSell = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    order_configuration: { type: 'object' },
    success: { type: 'boolean' },
    success_response: { type: 'object' },
  },
  required: ['order_configuration', 'success', 'success_response'],
  type: 'object',
};

export const orderMarketBuy = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    order_configuration: { type: 'object' },
    success: { type: 'boolean' },
    success_response: { type: 'object' },
  },
  required: ['order_configuration', 'success', 'success_response'],
  type: 'object',
};

export const orderMarketSell = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    order_configuration: { type: 'object' },
    success: { type: 'boolean' },
    success_response: { type: 'object' },
  },
  required: ['order_configuration', 'success', 'success_response'],
  type: 'object',
};

export const orderOne = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    order: { type: 'object' },
  },
  required: ['order'],
  type: 'object',
};
