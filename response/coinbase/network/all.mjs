/**
 * Handle Coinbase Advanced API network all response aggregation.
 *
 * @module response/coinbase/network/all
 */

import coinbaseAggregate from '../aggregate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies
 */
const networkAll = () => {
  const { config } = global.apiTools,
    {
      PATH: { NETWORK_ALL },
    } = config;

  coinbaseAggregate(NETWORK_ALL, '2024-08-23T11:04:55.458Z.json');
};

export default networkAll;
