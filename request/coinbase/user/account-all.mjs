/**
 * Handle Coinbase Advanced API request, with all authenticated accounts of current user.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccounts
 * @typedef {import("#types/response/coinbase/user/account-all.js").default} JUserAccountAll
 * @module request/coinbase/user/account-all
 */

import { userAccountAll as schema } from '#res/coinbase/user/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} limit The number of accounts to display per page (default: 49, maximum: 250).
 * @param {string} [cursor] Allows to get response with accounts at specific page.
 * @param {string} [retail_portfolio_id] Portfolio UUID, only applicable for legacy keys.
 * @returns {Promise<JUserAccountAll>} JSON data from response.
 */
const userAccountAll = async (limit, cursor, retail_portfolio_id) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { USER_ACCOUNT_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(USER_ACCOUNT_ALL, {
      required: { cursor, limit, retail_portfolio_id },
    }),
    json = await get(USER_ACCOUNT_ALL, schema, security, data);

  return json;
};

export default userAccountAll;
