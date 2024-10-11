/**
 * Handle Bybit API endpoint, with all networks from all currencies.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#types/response/bybit/currency/network-all.d.js").default} CurrencyNetworkAll
 * @module request/bybit/currency/network-all
 */

import { currencyNetworkAll as schema } from '#res/bybit/currency/schema.mjs';
import get from '../get.mjs';

/**
 * Uses the same URL path as `CURRENCY_ALL` endpoint.
 * @returns {Promise<CurrencyNetworkAll>} JSON data from response.
 */
const currencyNetworkAll = async () => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { CURRENCY_NETWORK_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = await get(CURRENCY_NETWORK_ALL, schema, security);

  return json;
};

export default currencyNetworkAll;
