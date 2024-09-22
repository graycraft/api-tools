/**
 * Handle Bybit API endpoint, with one deposit entry by transaction identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 * @module request/bybit/deposit/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositOne as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * Documentation do not describe `txID`, but another endpoint `WITHDRAW_ONE` also has this parameter.
 * Defference between `endTime` and `startTime` should be less than 30 days (30 days is default).
 * @param {string} txID Transaction identifier.
 * @param {{ coin?, cursor?, endTime?, limit?, startTime? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const depositOne = async (txID, { coin, cursor, endTime, limit, startTime } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_ONE },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(DEPOSIT_ONE, {
      optional: { coin, cursor, endTime, limit, startTime },
      required: { txID },
    }),
    json = await get(DEPOSIT_ONE, schema, security, data);

  return json;
};

export default depositOne;
