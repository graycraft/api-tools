/**
 * Handle Bybit API one balance endpoint, with entry by currency name.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 * @module request/bybit/balance/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { balanceOne as schema } from '../../../response/bybit/balance/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} accountType Account type.
 * @param {string} coin Currency name, multiple values supported, separated by commas.
 * @param {string} memberId UID, required with master API keys.
 * @param {{ withBonus? }} rest
 * @returns {Promise<Object>} JSON data from response.
 */
const balanceOne = async (coin, accountType, memberId, { withBonus } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { BALANCE_ONE },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
      currency: { base },
    } = settings,
    defaults = {
      accountType: account.wallet,
      coin: base,
      memberId: account[wallet],
    },
    data = validate(
      BALANCE_ONE,
      defaults,
      { throwRequired: { coin } },
      { warnOptional: { accountType, memberId } },
      { warnRequired: { withBonus } },
    ),
    json = await get(BALANCE_ONE, schema, security, data);

  return json;
};

export default balanceOne;
