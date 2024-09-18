/**
 * Handle Coinbase Advanced API all currencies endpoint.
 *
 * @module request/coinbase/currency/all
 */

import get from '../get.mjs';
//import { currencyAll as schema } from '../../../response/bybit/currency/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 */
const currencyAll = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = get(CURRENCY_ALL, {}, security);

  return json;
};

export default currencyAll;
