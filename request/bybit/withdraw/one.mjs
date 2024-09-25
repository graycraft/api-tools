/**
 * Handle Bybit API one wallet withdraw entry endpoint by transaction identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @module request/bybit/withdraw/one
 */

import { withdrawOne as schema } from '#res/bybit/withdraw/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} txID Transaction identifier.
 * @param {{ coin?, cursor?, endTime?, limit?, startTime?, withdrawID?, withdrawType? }} rest
 * @returns {Promise<object>} JSON data from response.
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
    data = validate(WITHDRAW_ONE, {
      required: { coin, cursor, endTime, limit, startTime, withdrawID, withdrawType },
      throw: { txID },
    }),
    json = await get(WITHDRAW_ONE, schema, security, data);

  return json;
};

export default withdrawOne;
