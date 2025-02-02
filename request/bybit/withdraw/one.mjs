/**
 * Handle Bybit API one wallet withdraw entry endpoint by transaction identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @typedef {import("#types/response/bybit/withdraw/one.d.js", { with: { "resolution-mode": "import" } }).default} WithdrawOne
 * @module request/bybit/withdraw/one
 */

import { withdrawOne as schema } from '#res/bybit/withdraw/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} txID Transaction identifier.
 * @param {{
 *   coin?, cursor?, endTime?, limit?, startTime?, withdrawID?, withdrawType?
 * }} options Optional parameters.
 * @returns {Promise<WithdrawOne>} JSON data from response.
 */
const withdrawOne = async (
  txID,
  { coin, cursor, endTime, limit, startTime, withdrawID, withdrawType } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
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
