/**
 * Handle Bybit API request, with all deposit entries.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 * @typedef {import("#types/response/bybit/deposit/all.d.js").default} DepositAll
 * @module request/bybit/deposit/all
 */

import { depositAll as schema } from '#res/bybit/deposit/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Documentation do not describe `txID`, but another endpoint `WITHDRAW_ONE` also has this parameter.
 * Difference between `endTime` and `startTime` should be less than 30 days (30 days is default).
 * @param {string} coin Currency code.
 * @param {{ cursor?: string; endTime?: string; limit?: string; startTime?: string; }} options Optional parameters.
 * @returns {Promise<DepositAll>} JSON data from response.
 */
const depositAll = async (coin, { cursor, endTime, limit, startTime /* , txID */ } = {}) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { DEPOSIT_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(DEPOSIT_ALL, {
      required: { coin, cursor, endTime, limit, startTime },
    }),
    json = await get(DEPOSIT_ALL, schema, security, data);

  return json;
};

export default depositAll;
