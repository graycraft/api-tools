/**
 * Handle Bybit API all balances endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 * @module request/bybit/balance/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { balanceAll as schema } from '../../../response/bybit/balance/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @param {string} accountType Account type.
 * @param {string} memberId UID, required with master API keys.
 * @param {{ coin?, withBonus? }} rest
 * @returns {Promise<Object>} JSON data from response.
 */
const balanceAll = async (accountType, memberId, { coin, withBonus } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { BALANCE_ALL },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
    } = settings,
    defaults = {
      accountType: account.wallet,
      memberId: account[wallet],
    },
    data = validate(
      BALANCE_ALL,
      defaults,
      { warnOptional: { accountType, memberId } },
      { warnRequired: { coin, withBonus } },
    ),
    json = await get(BALANCE_ALL, schema, security, data);

  return json;
};

export default balanceAll;
