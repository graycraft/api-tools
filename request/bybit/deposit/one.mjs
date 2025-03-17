/**
 * Handle Bybit API request, with one deposit entry by transaction identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 * @typedef {import('#types/response/bybit/deposit/one.js').default} DepositOne
 * @module request/bybit/deposit/one
 */

import { depositOne as schema } from '#res/bybit/deposit/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Documentation do not describe `txID`, but another endpoint `WITHDRAW_ONE` also has this parameter.
 * Difference between `endTime` and `startTime` should be less than 30 days (30 days is default).
 * @param {string} txID Transaction identifier.
 * @param {{
 *   coin?: string;
 *   cursor?: string;
 *   endTime?: string;
 *   limit?: string;
 *   startTime?: string;
 * }} options Optional parameters.
 * @returns {Promise<DepositOne>} JSON data from response.
 */
const depositOne = async (txID, { coin, cursor, endTime, limit, startTime } = {}) => {
  const { config, settings } = global.apiTools.bybit,
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
