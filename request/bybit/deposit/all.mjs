/**
 * Handle Bybit API deposit all endpoint.
 * 
 * @module request/bybit/deposit/all
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      DEPOSIT_ALL
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * Note: documentation do not describe `txID`, but similar endpoint for withdraw also has this parameter.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 */
const depositAll = (coin, { cursor, endTime, limit, startTime } = {}) => {
  const defaults = {},
    data = validate(
      DEPOSIT_ALL, isValid, defaults,
      { warnRequired: { coin } },
    )

  return bybitGet(sign, DEPOSIT_ALL, data);
};

export default depositAll;
