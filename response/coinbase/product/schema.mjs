/**
 * Product candles related JSON-schema for Coinbase Advanced API response structure.
 *
 * @todo Describe JSON-schemas.
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/product/schema
 */

const candles = {
  properties: {
    close: { type: 'string' },
    high: { type: 'string' },
    low: { type: 'string' },
    open: { type: 'string' },
    start: { type: 'string' },
    volume: { type: 'string' },
  },
  required: ['close', 'high', 'low', 'open', 'start', 'volume'],
  type: 'object',
};

export const productCandles = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    candles: {
      items: candles,
      minItems: 1,
      type: 'array',
    },
  },
  required: ['candles'],
  type: 'object',
};
