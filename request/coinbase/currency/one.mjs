/**
 * Handle Coinbase Advanced API endpoint, with one cryptocurrency filtered by asset UUID.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @module request/coinbase/currency/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { currencyOne as schema } from '../../../response/coinbase/currency/schema.mjs';

/**
 * @param {string} asset_uuid Not supported by the API, must be filtered while parsing.
 * @returns {Promise<{ data: { asset_id: string } }>}
 */
const currencyOne = (asset_uuid) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_ONE },
    } = config,
    {
      currency: { uuid },
    } = settings,
    data = validate(CURRENCY_ONE, {
      defaults: {
        asset_uuid: uuid,
      },
      required: { asset_uuid },
    }),
    json = get(CURRENCY_ONE, schema, null, data);

  return json;
};

export default currencyOne;
