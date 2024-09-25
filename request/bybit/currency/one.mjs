/**
 * Handle Bybit API currency endpoint, with one entry by currency name.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @module request/bybit/currency/one
 */

import { currencyOne as schema } from '#res/bybit/currency/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @returns {Promise<object>} JSON data from response.
 */
const currencyOne = async (coin) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { CURRENCY_ONE },
    } = config,
    {
      authentication: { security },
      currency: { base },
    } = settings,
    data = validate(CURRENCY_ONE, {
      defaults: {
        coin: base,
      },
      optional: { coin },
    }),
    json = await get(CURRENCY_ONE, schema, security, data);

  return json;
};

export default currencyOne;
