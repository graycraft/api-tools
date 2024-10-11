/**
 * Handle Bybit API endpoint, with new deposit address information of a master account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/master-deposit-addr
 * @typedef {import("#types/response/bybit/deposit/new-master.d.js").default} DepositNewMaster
 * @module request/bybit/deposit/new-master
 */

import { depositNewMaster as schema } from '#res/bybit/deposit/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} coin Currency name.
 * @param {string} chainType Value of `chain` parameter from `CURRENCY_ALL` endpoint must be used for this.
 * @returns {Promise<DepositNewMaster>} JSON data from response.
 */
const depositNewMaster = async (coin, chainType) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { DEPOSIT_NEW_MASTER },
    } = config,
    {
      currency: { base, network },
    } = prefs,
    {
      authentication: { security },
    } = settings,
    data = validate(DEPOSIT_NEW_MASTER, {
      defaults: {
        chainType: network,
        coin: base,
      },
      optional: { chainType, coin },
    }),
    json = await get(DEPOSIT_NEW_MASTER, schema, security, data);

  return json;
};

export default depositNewMaster;
