/**
 * Handle Bybit API balance endpoint, with one entry by currency.
 *
 * @module request/bybit/balance/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { balanceOne as schema } from '../../../response/bybit/balance/schema.mjs';

/**
 * `memberId` is UID.
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 * @param {string} accountType
 * @param {string} coin
 * @param {string} memberId
 * @param {{ withBonus? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const balanceOne = (coin, accountType, memberId, { withBonus } = {}) => {
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
    json = get(BALANCE_ONE, schema, security, data);

  return json;
};

export default balanceOne;
