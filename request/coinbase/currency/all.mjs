/**
 * Handle Coinbase Advanced API request, listing all known currencies.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies#get-cryptocurrencies
 * @typedef {import("#types/response/coinbase/currency/all.js").default} JCurrencyAll
 * @module request/coinbase/currency/all
 */

import { currencyAll as schema } from '#res/coinbase/currency/schema.mjs';

import get from '../get.mjs';

/**
 * @returns {Promise<JCurrencyAll>} JSON data from response.
 */
const currencyAll = async () => {
  const { config } = global.apiTools.coinbase,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    json = await get(CURRENCY_ALL, schema, null);

  return json;
};

export default currencyAll;
