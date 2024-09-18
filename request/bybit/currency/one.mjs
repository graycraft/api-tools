/**
 * Handle Bybit API currency endpoint, with one entry by currency name.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @module request/bybit/currency/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { currencyOne as schema } from '../../../response/bybit/currency/schema.mjs';

/**
 * @returns {Promise<Object>} JSON data from response.
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
    defaults = {
      coin: base,
    },
    data = validate(CURRENCY_ONE, defaults, { warnOptional: { coin } }),
    json = await get(CURRENCY_ONE, schema, security, data);

  return json;
};

export default currencyOne;
