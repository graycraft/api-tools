/**
 * Handle Bybit API balance all endpoint.
 *
 * @module request/bybit/balance/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { balanceAll as schema } from '../../../response/bybit/balance/schema.mjs';

/**
 * `memberId` is UID.
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 * @param {string} accountType
 * @param {string} memberId
 * @param {{ coin?, withBonus? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const balanceAll = (accountType, memberId, { coin, withBonus } = {}) => {
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
    json = get(BALANCE_ALL, schema, security, data);

  return json;
};

export default balanceAll;
