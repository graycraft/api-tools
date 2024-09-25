/**
 * Handle Bybit API all currencies endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @module request/bybit/currency/all
 */

import { currencyAll as schema } from '#res/bybit/currency/schema.mjs';
import get from '../get.mjs';

/**
 * @returns {Promise<object>} JSON data from response.
 */
const currencyAll = async () => {
  const { config, settings } = global.apiTools,
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
