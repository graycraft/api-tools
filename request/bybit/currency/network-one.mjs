/**
 * Handle Bybit API one network endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#types/response/bybit/currency/network-one.d.js").default} CurrencyNetworkOne
 * @module request/bybit/currency/network-one
 */

import { currencyNetworkOne as schema } from '#res/bybit/currency/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Uses the same URL path as `CURRENCY_ONE` endpoint.
 * Value of `chain` parameter from `CURRENCY_ONE` endpoint must be used.
 * @param {string} coin Currency name.
 * @param {string} chain Not supported by the API, must be filtered while parsing.
 * @returns {Promise<CurrencyNetworkOne>} JSON data from response.
 */
const currencyNetworkOne = async (coin, chain) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { CURRENCY_NETWORK_ONE },
    } = config,
    {
      currency: { base, network },
    } = prefs,
    {
      authentication: { security },
    } = settings,
    data = validate(CURRENCY_NETWORK_ONE, {
      defaults: {
        chain: network,
        coin: base,
      },
      optional: { chain, coin },
    }),
    json = await get(CURRENCY_NETWORK_ONE, schema, security, data);

  return json;
};

export default currencyNetworkOne;
