/**
 * Handle Coinbase Advanced API endpoint, with all authenticated accounts of current user.
 *
 * @module request/coinbase/user/account-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { userAccountAll as schema } from '../../../response/coinbase/user/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccounts
 * @param {string} limit The number of accounts to display per page (49 by default, maximum 250).
 * @param {string} [cursor] Allows to get response with accounts at specific page.
 * @param {string} [retail_portfolio_id] Portfolio UUID, only applicable for legacy keys.
 * @returns {Promise<{ accounts, cursor, has_next, size }>} JSON data from response.
 */
const userAccountAll = async (limit, cursor, retail_portfolio_id) => {
  const { config, settings } = global.apiTools,
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
