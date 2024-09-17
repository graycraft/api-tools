/**
 * Handle Coinbase Advanced API currency one endpoint.
 *
 * @module request/bybit/currency/one
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 */
const currencyOne = (coin) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_ONE },
    } = config,
    {
      authentication: { sign },
      currency: { base },
    } = settings,
    defaults = {
      coin: base,
    },
    data = validateParams(CURRENCY_ONE, isValidParams, defaults, {
      warnOptional: { coin },
    });

  return coinbaseGet(sign, CURRENCY_ONE, data);
};

export default currencyOne;
