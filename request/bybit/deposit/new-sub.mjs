/**
 * Handle Bybit API endpoint, with deposit address information of a sub account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr
 * @module request/bybit/new-sub
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { depositNewSub as schema } from '../../../response/bybit/deposit/schema.mjs';

/**
 * Custodial sub account deposit address cannot be obtained.
 * @param {string} subMemberId Sub UID.
 * @param {string} coin Currency name.
 * @param {string} chainType Value of `chain` parameter from `CURRENCY_ALL` endpoint must be used for this.
 * @returns {Promise<object>} JSON data from response.
 */
const depositNewSub = async (subMemberId, coin, chainType) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { DEPOSIT_NEW_SUB },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base, network },
    } = settings,
    data = validate(DEPOSIT_NEW_SUB, {
      defaults: {
        chainType: network,
        coin: base,
        subMemberId: Object.entries(account).find((entry) => !entry[1].main)[0],
      },
      optional: { chainType, coin, subMemberId },
    }),
    json = await get(DEPOSIT_NEW_SUB, schema, security, data);

  return json;
};

export default depositNewSub;
