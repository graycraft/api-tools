/**
 * Handle Bybit API endpoint, with deposit address information of a sub account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/sub-deposit-addr
 * @typedef {import("#types/response/bybit/deposit/new-sub.d.js").default} DepositNewSub
 * @module request/bybit/deposit/new-sub
 */

import { depositNewSub as schema } from '#res/bybit/deposit/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Custodial sub account deposit address cannot be obtained.
 * @param {string} subMemberId Sub UID.
 * @param {string} coin Currency name.
 * @param {string} chainType Value of `chain` parameter from `CURRENCY_ALL` endpoint must be used for this.
 * @returns {Promise<DepositNewSub>} JSON data from response.
 */
const depositNewSub = async (subMemberId, coin, chainType) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { DEPOSIT_NEW_SUB },
    } = config,
    {
      currency: { base, network },
    } = prefs,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(DEPOSIT_NEW_SUB, {
      defaults: {
        chainType: network,
        coin: base,
        subMemberId: account[account.wallet],
      },
      optional: { chainType, coin, subMemberId },
    }),
    json = await get(DEPOSIT_NEW_SUB, schema, security, data);

  return json;
};

export default depositNewSub;
