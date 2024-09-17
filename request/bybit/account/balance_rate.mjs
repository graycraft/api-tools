/**
 * Handle Bybit API account balance with rate endpoint.
 *
 * @module request/bybit/account/balance_rate
 */

import bybitGet from '../get.mjs';
import config from '../../../configuration/bybit.json' with { type: 'json' };
import validate from '../../../lib/validation.mjs';
import isValid from '../../../request/bybit/validate.mjs';
import settings from '../../../settings/bybit.json' with { type: 'json' };

const {
    PATH: { ACCOUNT_BALANCE_RATE },
  } = config,
  {
    account,
    authentication: { sign },
    currency: { base },
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/account/wallet-balance
 */
const accountBalanceRate = (accountType, coin) => {
  let defaults = {
      accountType: account.wallet,
      coin: base,
    },
    data = validate(ACCOUNT_BALANCE_RATE, isValid, defaults, {
      warnOptional: { accountType, coin },
    });

  return bybitGet(sign, ACCOUNT_BALANCE_RATE, data);
};

export default accountBalanceRate;
