/**
 * Handle Bybit API request, with new deposit address information of a master account.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/deposit/master-deposit-addr
 * @typedef {import("#types/response/bybit/deposit/new-master.d.js").default} DepositNewMaster
 * @module request/bybit/deposit/new-master
 */

import { depositNewMaster as schema } from '#res/bybit/deposit/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} coin Currency code.
 * @param {string} chainType Value of `chain` parameter from `CURRENCY_ALL` endpoint must be used for this.
 * @returns {Promise<DepositNewMaster>} JSON data from response.
 */
const depositNewMaster = async (coin, chainType) => {
  const { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE },
      PATH: { DEPOSIT_NEW_MASTER },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(DEPOSIT_NEW_MASTER, {
      defaults: {
        chainType: BASE.CHAIN,
        coin: BASE.NAME,
      },
      optional: { chainType, coin },
    }),
    json = await get(DEPOSIT_NEW_MASTER, schema, security, data);

  return json;
};

export default depositNewMaster;
