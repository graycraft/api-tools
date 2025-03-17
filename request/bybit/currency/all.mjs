/**
 * Handle Bybit API all currencies (coins) request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#types/response/bybit/currency/all.js").default} JCurrencyAll
 * @module request/bybit/currency/all
 */

import { currencyAll as schema } from '#res/bybit/currency/schema.mjs';

import get from '../get.mjs';

/**
 * @returns {Promise<JCurrencyAll>} JSON data from response.
 */
const currencyAll = async () => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = await get(CURRENCY_ALL, schema, security);

  return json;
};

export default currencyAll;
