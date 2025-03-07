/**
 * Handle Bybit API currency request, with one entry by currency (coin) code.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#types/response/bybit/currency/one.d.js").default} CurrencyOne
 * @module request/bybit/currency/one
 */

import { currencyOne as schema } from '#res/bybit/currency/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} coin Currency code.
 * @returns {Promise<CurrencyOne>} JSON data from response.
 */
const currencyOne = async (coin) => {
  const { config, settings } = global.apiTools.bybit,
    {
      ASSET: { BASE },
      PATH: { CURRENCY_ONE },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(CURRENCY_ONE, {
      defaults: {
        coin: BASE.CODE,
      },
      optional: { coin },
    }),
    json = await get(CURRENCY_ONE, schema, security, data);

  return json;
};

export default currencyOne;
