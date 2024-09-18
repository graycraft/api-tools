/**
 * Handle Bybit API one wallet withdraw entry endpoint by transaction identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @module request/bybit/withdraw/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { withdrawOne as schema } from '../../../response/bybit/withdraw/schema.mjs';

/**
 * @param {string} txID Transaction identifier.
 * @param {{ coin?, cursor?, endTime?, limit?, startTime?, withdrawID?, withdrawType? }} rest
 * @returns {Promise<Object>} JSON data from response.
 */
const withdrawOne = async (
  txID,
  { coin, cursor, endTime, limit, startTime, withdrawID, withdrawType } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { WITHDRAW_ONE },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(WITHDRAW_ONE, defaults, {
      throwRequired: { txID },
      warnRequired: { coin, cursor, endTime, limit, startTime, withdrawID, withdrawType },
    }),
    json = await get(WITHDRAW_ONE, schema, security, data);

  return json;
};

export default withdrawOne;
