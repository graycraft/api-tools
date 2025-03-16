/**
 * Handle Bybit API one balance request, with entry by currency (coin) name.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 * @typedef {import("#types/response/bybit/balance/one.d.js").default} BalanceOne
 * @module request/bybit/balance/one
 */

import { balanceOne as schema } from '#res/bybit/balance/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} accountType Account type.
 * @param {string} coin Currency code, multiple values supported, separated by commas.
 * @param {string} memberId UID, required with master API keys.
 * @param {{ withBonus?: string }} options Optional parameters.
 * @returns {Promise<BalanceOne>} JSON data from response.
 */
const balanceOne = async (accountType, coin, memberId, { withBonus } = {}) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      COIN: { BASE },
      PATH: { BALANCE_ONE },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
    } = settings,
    data = validate(BALANCE_ONE, {
      defaults: {
        accountType: wallet,
        coin: BASE.NAME,
        memberId: account[wallet],
      },
      optional: { accountType, coin, memberId },
      required: { withBonus },
    }),
    json = await get(BALANCE_ONE, schema, security, data);

  return json;
};

export default balanceOne;
