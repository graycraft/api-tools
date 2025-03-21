/**
 * Market related JSON-schemas for Coinbase Advanced API response structure.
 *
 * @todo Describe JSON-schemas.
 * @see https://json-schema.org/draft/2020-12/release-notes
 * @module response/coinbase/market/schema
 */

import config from '#config/coinbase.json' with { type: 'json' };

const {
  ORDER: { SIDE },
  PRODUCT,
} = config;

export const marketAll = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    num_products: { type: 'number' },
    products: { type: 'array' },
  },
  required: ['num_products', 'products'],
  type: 'object',
};

export const marketOne = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    alias: { type: 'string' },
    alias_to: { type: 'array' },
    approximate_quote_24h_volume: { type: 'string' },
    auction_mode: { type: 'boolean' },
    base_currency_id: { type: 'string' },
    base_display_symbol: { type: 'string' },
    base_increment: { type: 'string' },
    base_max_size: { type: 'string' },
    base_min_size: { type: 'string' },
    base_name: { type: 'string' },
    cancel_only: { type: 'boolean' },
    display_name: { type: 'string' },
    fcm_trading_session_details: { type: 'null' },
    is_disabled: { type: 'boolean' },
    limit_only: { type: 'boolean' },
    mid_market_price: { type: 'string' },
    new: { type: 'boolean' },
    new_at: { type: 'string' },
    post_only: { type: 'boolean' },
    price_increment: { type: 'string' },
    product_id: { type: 'string' },
    product_type: { enum: Object.values(PRODUCT), type: 'string' },
    product_venue: { type: 'string' },
    price: { type: 'string' },
    price_percentage_change_24h: { type: 'string' },
    quote_currency_id: { type: 'string' },
    quote_display_symbol: { type: 'string' },
    quote_increment: { type: 'string' },
    quote_max_size: { type: 'string' },
    quote_min_size: { type: 'string' },
    quote_name: { type: 'string' },
    status: { type: 'string' },
    trading_disabled: { type: 'boolean' },
    view_only: { type: 'boolean' },
    volume_24h: { type: 'string' },
    volume_percentage_change_24h: { type: 'string' },
    watched: { type: 'boolean' },
  },
  required: [
    'alias',
    'alias_to',
    'approximate_quote_24h_volume',
    'auction_mode',
    'base_currency_id',
    'base_display_symbol',
    'base_increment',
    'base_max_size',
    'base_min_size',
    'base_name',
    'cancel_only',
    'display_name',
    'fcm_trading_session_details',
    'is_disabled',
    'limit_only',
    'mid_market_price',
    'new',
    'new_at',
    'post_only',
    'price_increment',
    'product_id',
    'product_type',
    'product_venue',
    'price',
    'price_percentage_change_24h',
    'quote_currency_id',
    'quote_display_symbol',
    'quote_increment',
    'quote_max_size',
    'quote_min_size',
    'quote_name',
    'status',
    'trading_disabled',
    'view_only',
    'volume_24h',
    'volume_percentage_change_24h',
    'watched',
  ],
  type: 'object',
};

export const marketTickers = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  additionalProperties: false,
  properties: {
    best_ask: { type: 'string' },
    best_bid: { type: 'string' },
    trades: {
      items: {
        properties: {
          product_id: { type: 'string' },
          side: { enum: Object.values(SIDE), type: 'string' },
          trade_id: { type: 'string' },
        },
        required: ['product_id', 'side', 'trade_id'],
        type: 'object',
      },
      minItems: 1,
      type: 'array',
    },
  },
  required: ['best_ask', 'best_bid', 'trades'],
  type: 'object',
};
