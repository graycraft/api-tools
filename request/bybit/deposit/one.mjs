/**
 * Handle Bybit API deposit one endpoint.
 * 
 * @module request/bybit/deposit/one
 */

import bybitGet from "../get.mjs";
import config from "../../../configuration/bybit.json" with { type: "json" };
import validate from "../../../lib/validation.mjs";
import isValid from "../../../request/bybit/validate.mjs";
import settings from "../../../settings/bybit.json" with { type: "json" };

const {
    PATH: {
      DEPOSIT_ONE
    },
  } = config,
  {
    authentication: {
      sign
    },
  } = settings;

/**
 * Documentation do not describe `txID`, but similar endpoint for withdraw also has this parameter.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 */
const depositOne = (txID, { cursor, endTime, limit, startTime } = {}) => {
  const defaults = {},
    data = validate(
      DEPOSIT_ONE, isValid, defaults,
      { throwRequired: { txID } },
    );

  return bybitGet(sign, DEPOSIT_ONE, data);
};

export default depositOne;
