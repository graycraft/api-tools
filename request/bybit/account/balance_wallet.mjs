/**
 * Handle Bybit API account wallet balance endpoint.
 *
 * @module request/bybit/account/balance_wallet
 */

import bybitGet from '../get.mjs';
import config from '../../../configuration/bybit.json' with { type: 'json' };
import validate from '../../../lib/validation.mjs';
import isValid from '../../../request/bybit/validate.mjs';
import settings from '../../../settings/bybit.json' with { type: 'json' };

const {
    PATH: { ACCOUNT_BALANCE_WALLET },
  } = config,
  {
    account,
    authentication: { sign },
    currency: { base },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/balance/all-balance
 */
const accountBalanceWallet = (accountType, coin, { memberId, withBonus }) => {
  const defaults = {
      accountType: account.wallet,
      coin: base,
    },
    data = validate(
      ACCOUNT_BALANCE_WALLET,
      isValid,
      defaults,
      { warnOptional: { accountType, coin } },
      { warnRequired: { memberId, withBonus } },
    );

  return bybitGet(sign, ACCOUNT_BALANCE_WALLET, data);
};

export default accountBalanceWallet;
