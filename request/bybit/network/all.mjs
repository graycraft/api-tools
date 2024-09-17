/**
 * Handle Bybit API network all endpoint.
 * Note: uses the same endpoint as currency all.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @module request/bybit/network/all
 */

import get from '../get.mjs';
import { networkAll as schema } from '../../../response/bybit/network/schema.mjs';

/**
 * Note: uses the same endpoint as currency all.
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @returns {Promise<object>} JSON data from response.
 */
const networkAll = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { NETWORK_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = get(NETWORK_ALL, schema, security);

  return json;
};

export default networkAll;
