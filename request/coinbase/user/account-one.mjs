/**
 * Handle Coinbase Advanced API endpoint, with an account information of current user by account UUID.
 *
 * @module request/coinbase/user/account-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { userAccountOne as schema } from '../../../response/coinbase/user/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccount
 * @param {string} account_uuid Account UUID.
 * @returns {Promise<{ account }>} JSON data from response.
 */
const userAccountOne = (account_uuid) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { USER_ACCOUNT_ONE },
    } = config,
    {
      authentication: { security },
      user,
    } = settings,
    data = validate(USER_ACCOUNT_ONE, {
      defaults: {
        account_uuid: user.account,
      },
      required: { account_uuid },
    }),
    json = get(USER_ACCOUNT_ONE, schema, security, data);

  return json;
};

export default userAccountOne;
