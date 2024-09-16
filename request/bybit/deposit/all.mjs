/**
 * Handle Bybit API endpoint, with all deposit entries.
 * 
 * @module request/bybit/deposit/all
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * Note: documentation do not describe `txID`, but similar endpoint for withdraw also has this parameter.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/deposit-record
 */
const depositAll = (coin, { cursor, endTime, limit, startTime, txID } = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { DEPOSIT_ALL } } = config,
    {
      authentication: { sign },
      // currency: { base }
    } = settings,
    defaults = {
      // coin: base,
    },
    data = bybitValidate(DEPOSIT_ALL, defaults,
      { warnRequired: { coin, cursor, endTime, limit, startTime } },
    )

  return bybitGet(sign, DEPOSIT_ALL, data);
};

export default depositAll;
