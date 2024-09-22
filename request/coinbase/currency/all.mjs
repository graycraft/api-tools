/**
 * Handle Coinbase Advanced API endpoint, with list of all known cryptocurrencies.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @module request/coinbase/currency/all
 */

import get from '../get.mjs';
import { currencyAll as schema } from '../../../response/coinbase/currency/schema.mjs';

/**
 * @returns {Promise<{ data: [{ asset_id: string }] }>}
 */
const currencyAll = () => {
  const { config } = global.apiTools,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    json = get(CURRENCY_ALL, schema, null);

  return json;
};

export default currencyAll;
