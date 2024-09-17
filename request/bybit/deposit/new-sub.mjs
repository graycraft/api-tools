/**
 * Handle Bybit API deposit new sub endpoint.
 *
 * @module request/bybit/new-sub
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositNewSub as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * Value of `chain` param must from `CURRENCY_ALL` endpoint must be used for `chainType`.
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr
 * @param {string} subMemberId
 * @param {string} coin
 * @param {string} chainType
 * @returns {Promise<object>} JSON data from response.
 */
const depositNewSub = (subMemberId, coin, chainType) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_NEW_SUB },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base, network },
    } = settings,
    defaults = {
      chainType: network,
      coin: base,
      subMemberId: Object.entries(account).find((entry) => !entry[1].main)[0],
    },
    data = validate(DEPOSIT_NEW_SUB, defaults, {
      warnOptional: { chainType, coin, subMemberId },
    }),
    json = get(DEPOSIT_NEW_SUB, schema, security, data);

  return json;
};

export default depositNewSub;
