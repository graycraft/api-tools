/**
 * Handle Bybit API deposit endpoint, with one entry by transaction identifier.
 * 
 * @module request/bybit/deposit/one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * Note: documentation do not describe `txID`, but similar endpoint for withdraw also has this parameter.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 */
const depositOne = (txID, { coin, cursor, endTime, limit, startTime } = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { DEPOSIT_ONE } } = config,
    {
      authentication: { sign },
      // currency: { base }
    } = settings,
    defaults = {
      // coin: base,
    },
    data = bybitValidate(DEPOSIT_ONE, defaults,
      { throwRequired: { txID } },
      { warnOptional: { coin, cursor, endTime, limit, startTime } },
    );

  return bybitGet(sign, DEPOSIT_ONE, data);
};

export default depositOne;
