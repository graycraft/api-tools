/**
 * Handle Bybit API deposit endpoint, with one entry by transaction identifier.
 *
 * @module request/bybit/deposit/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositOne as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * Note: documentation do not describe `txID`, but similar endpoint for withdraw also has this parameter.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 * @param {string} txID
 * @param {{ coin?, cursor?, endTime?, limit?, startTime? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const depositOne = (txID, { coin, cursor, endTime, limit, startTime } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_ONE },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(
      DEPOSIT_ONE,
      defaults,
      { throwRequired: { txID } },
      { warnOptional: { coin, cursor, endTime, limit, startTime } },
    ),
    json = get(DEPOSIT_ONE, schema, security, data);

  return json;
};

export default depositOne;
