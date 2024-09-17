/**
 * Handle Bybit API endpoint, with all deposit entries.
 *
 * @module request/bybit/deposit/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositAll as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * Note: documentation do not describe `txID`, but similar endpoint for withdraw also has this parameter.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 * @param {string} coin
 * @param {{ cursor?, endTime?, limit?, startTime?, txID? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const depositAll = (coin, { cursor, endTime, limit, startTime /* , txID */ } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(DEPOSIT_ALL, defaults, {
      warnRequired: { coin, cursor, endTime, limit, startTime },
    }),
    json = get(DEPOSIT_ALL, schema, security, data);

  return json;
};

export default depositAll;
