/**
 * Handle Coinbase Advanced API currency all endpoint.
 *
 * @module request/coinbase/currency/all
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 */
const currencyAll = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    {
      authentication: { sign },
    } = settings;

  coinbaseGet(sign, CURRENCY_ALL);
};

export default currencyAll;
