/**
 * Handle Coinbase Advanced API currency all response aggregation.
 *
 * @module response/coinbase/currency/all
 */

import coinbaseAggregate from '../aggregate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies
 */
const currencyAll = () => {
  const { config } = global.apiTools,
    {
      PATH: { CURRENCY_ALL },
    } = config;

  coinbaseAggregate(CURRENCY_ALL, '2024-08-23T11:04:55.458Z.json');
};

export default currencyAll;
