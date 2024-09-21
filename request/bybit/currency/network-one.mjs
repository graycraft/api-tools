/**
 * Handle Bybit API one network endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @module request/bybit/currency/network-one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { currencyNetworkOne as schema } from '../../../response/bybit/currency/schema.mjs';

/**
 * Uses the same endpoint as `currencyOne`.
 * Value of `chain` parameter must from `CURRENCY_ALL` endpoint must be used.
 * @param {string} coin Currency name.
 * @param {string} chain Not supported by the API, must be filtered while parsing.
 * @returns {Promise<object>} JSON data from response.
 */
const currencyNetworkOne = async (coin, chain) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_NETWORK_ONE },
    } = config,
    {
      authentication: { security },
      currency: { base, network },
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
