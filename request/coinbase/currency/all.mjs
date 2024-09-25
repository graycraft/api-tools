/**
 * Handle Coinbase Advanced API endpoint, listing all known cryptocurrencies.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @module request/coinbase/currency/all
 */

import { currencyAll as schema } from '#res/coinbase/currency/schema.mjs';
import get from '../get.mjs';

/**
 * @returns {Promise<{
 *   data: [
 *     {
 *       asset_id: string,
 *       code: string,
 *       name: string
 *     }
 *   ]
 * }>} JSON data from response.
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
