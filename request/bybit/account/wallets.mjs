/**
 * Handle Bybit API account wallet types endpoint.
 *
 * @module request/bybit/account/wallets
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { accountWallets as schema } from '../../../response/bybit/account/schema.mjs';

/**
 * `memberIds` is UIDs.
 * @see https://bybit-exchange.github.io/docs/v5/user/wallet-type
 * @see https://bybit-exchange.github.io/docs/v5/enum#accounttype
 * @returns {Promise<object>} JSON data from response.
 */
const accountWallets = (memberIds) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ACCOUNT_WALLETS },
    } = config,
    {
      account,
      account: { wallet },
      authentication: { security },
    } = settings,
    defaults = {
      memberIds: [account[wallet]].join(),
    },
    data = validate(ACCOUNT_WALLETS, defaults, {
      warnOptional: { memberIds },
    }),
    json = get(ACCOUNT_WALLETS, schema, security, data);

  return json;
};

export default accountWallets;
