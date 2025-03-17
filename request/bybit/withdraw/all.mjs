/**
 * Handle Bybit API all wallet withdraw entries request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @typedef {import("#types/response/bybit/withdraw/all.js").default} WithdrawAll
 * @module request/bybit/withdraw/all
 */

import { withdrawAll as schema } from '#res/bybit/withdraw/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {{
 *   coin?: string;
 *   cursor?: string;
 *   endTime?: string;
 *   limit?: string;
 *   startTime?: string;
 *   txID?: string;
 *   withdrawID?: string;
 *   withdrawType?: string;
 * }} options Optional parameters.
 * @returns {Promise<WithdrawAll>} JSON data from response.
 */
const withdrawAll = async ({
  coin,
  cursor,
  endTime,
  limit,
  startTime,
  txID,
  withdrawID,
  withdrawType,
} = {}) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { WITHDRAW_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(WITHDRAW_ALL, {
      required: { coin, cursor, endTime, limit, startTime, txID, withdrawID, withdrawType },
    }),
    json = await get(WITHDRAW_ALL, schema, security, data);

  return json;
};

export default withdrawAll;
