/**
 * Handle Bybit API currency all endpoint.
 *
 * @module request/bybit/currency/all
 */

import get from '../get.mjs';
import { currencyAll as schema } from '../../../response/bybit/currency/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @returns {Promise<object>} JSON data from response.
 */
const currencyAll = () => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    json = get(CURRENCY_ALL, schema, security);

  return json;
};

export default currencyAll;
