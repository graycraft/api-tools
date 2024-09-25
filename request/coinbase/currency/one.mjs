/**
 * Handle Coinbase Advanced API endpoint, finding one cryptocurrency by asset UUID.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @module request/coinbase/currency/all
 */

import { currencyOne as schema } from '#res/coinbase/currency/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} asset_uuid Not supported by the API, item is found while parsing.
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
const currencyOne = (asset_uuid) => {
  const { config } = global.apiTools,
    {
      PATH: { CURRENCY_ONE },
    } = config,
    data = validate(CURRENCY_ONE, {
      throw: { asset_uuid },
    }),
    json = get(CURRENCY_ONE, schema, null, data);

  return json;
};

export default currencyOne;
