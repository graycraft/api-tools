/**
 * Handle Coinbase Advanced API endpoint, with an account information of current user by account UUID.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccount
 * @typedef {import("#types/response/coinbase/user/account-one.d.js").default} UserAccountOne
 * @module request/coinbase/user/account-one
 */

import { userAccountOne as schema } from '#res/coinbase/user/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} account_uuid Account UUID.
 * @returns {Promise<UserAccountOne>} JSON data from response.
 */
const userAccountOne = async (account_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { USER_ACCOUNT_ONE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(USER_ACCOUNT_ONE, {
      defaults: {
        account_uuid: user[portfolio].account.uuid,
      },
      required: { account_uuid },
    }),
    json = await get(USER_ACCOUNT_ONE, schema, security, data);

  return json;
};

export default userAccountOne;
