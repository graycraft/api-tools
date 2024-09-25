/**
 * Handle Bybit API currency all endpoint.
 *
 * @module response/bybit/currency/all
 */

import config from '#config/bybit.json' with { type: 'json' };
import bybitAggregate from '../aggregate.mjs';

const {
  PATH: { TRANSFER_ALL },
} = config;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const addressAll = () => bybitAggregate(TRANSFER_ALL, '2024-08-17T15:29:51.146Z.json');

export default addressAll;
