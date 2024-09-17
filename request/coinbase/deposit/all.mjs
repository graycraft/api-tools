/**
 * Handle Bybit API deposit all endpoint.
 *
 * @module request/bybit/deposit/all
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-deposits#list-deposits
 */
const depositAll = (coin, { cursor, endTime, limit, startTime } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_ALL },
    } = config,
    {
      authentication: { sign },
    } = settings,
    defaults = {},
    data = validateParams(DEPOSIT_ALL, isValidParams, defaults, {
      warnRequired: { coin },
    });

  return coinbaseGet(sign, DEPOSIT_ALL, data);
};

export default depositAll;
