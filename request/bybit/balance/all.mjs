/**
 * Handle Bybit API all balances request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 * @typedef {import("#types/response/bybit/balance/all.js").default} BalanceAll
 * @module request/bybit/balance/all
 */

import { balanceAll as schema } from '#res/bybit/balance/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Coin parameter is required for unified accounts.
 * @param {string} accountType Account type.
 * @param {string} memberId UID, required with master API keys.
 * @param {{ coin?: string; withBonus?: string }} options Optional parameters.
 * @returns {Promise<BalanceAll>} JSON data from response.
 */
const balanceAll = async (accountType, memberId, { coin, withBonus } = {}) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { BALANCE_ALL },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
    } = settings,
    data = validate(BALANCE_ALL, {
      defaults: {
        accountType: wallet,
        memberId: account[wallet],
      },
      optional: { accountType, memberId },
      required: { coin, withBonus },
    }),
    json = await get(BALANCE_ALL, schema, security, data);

  return json;
};

export default balanceAll;
