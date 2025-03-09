/**
 * Handle Coinbase Advanced API request, finding one currency by asset UUID.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @typedef {import("#types/response/coinbase/currency/one.d.js").default} CurrencyOne
 * @module request/coinbase/currency/one
 */

import { currencyOne as schema } from '#res/coinbase/currency/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} asset_id Not supported by the API, item is found while parsing.
 * @returns {Promise<CurrencyOne>} JSON data from response.
 */
const currencyOne = async (asset_id) => {
  const { config } = global.apiTools.coinbase,
    {
      PATH: { CURRENCY_ONE },
    } = config,
    data = validate(CURRENCY_ONE, {
      throw: { asset_id },
    }),
    json = await get(CURRENCY_ONE, schema, null, data);

  return json;
};

export default currencyOne;
