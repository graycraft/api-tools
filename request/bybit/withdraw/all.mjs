/**
 * Handle Bybit API all wallet withdraw entries endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/withdraw/withdraw-record
 * @module request/bybit/withdraw/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { withdrawAll as schema } from '../../../response/bybit/withdraw/schema.mjs';

/**
 * @param {{ coin?, cursor?, endTime?, limit?, startTime?, txID?, withdrawID?, withdrawType? }} rest
 * @returns {Promise<Object>} JSON data from response.
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
  const { config, settings } = global.apiTools,
    {
      PATH: { WITHDRAW_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(WITHDRAW_ALL, defaults, {
      warnRequired: { coin, cursor, endTime, limit, startTime, txID, withdrawID, withdrawType },
    }),
    json = await get(WITHDRAW_ALL, schema, security, data);

  return json;
};

export default withdrawAll;
