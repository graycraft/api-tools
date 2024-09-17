/**
 * Handle Bybit API network one endpoint.
 *
 * @module request/bybit/network/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { networkOne as schema } from '../../../response/bybit/network/schema.mjs';

/**
 * Note: uses the same endpoint as currency one.
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @param {string} coin
 * @param {string} chain
 * @returns {Promise<object>} JSON data from response.
 */
const networkOne = (coin, chain) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { NETWORK_ONE },
    } = config,
    {
      authentication: { security },
      currency: { base, network },
    } = settings,
    defaults = {
      coin: base,
      chain: network,
    },
    data = validate(NETWORK_ONE, defaults, { warnOptional: { chain, coin } }),
    json = get(NETWORK_ONE, schema, security, data);

  return json;
};

export default networkOne;
