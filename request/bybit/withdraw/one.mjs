/**
 * Handle Bybit API one wallet withdraw endpoint by transaction identifier.
 *
 * @module request/bybit/withdraw/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { withdrawOne as schema } from '../../../response/bybit/withdraw/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @param {string} txID
 * @returns {Promise<object>} JSON data from response.
 */
const withdrawOne = (txID) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { WITHDRAW_ONE },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(WITHDRAW_ONE, defaults, { throwRequired: { txID } }),
    json = get(WITHDRAW_ONE, schema, security, data);

  return json;
};

export default withdrawOne;
