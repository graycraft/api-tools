/**
 * Handle Coinbase Advanced API endpoint for all authenticated accounts of current user.
 *
 * @module request/coinbase/user/account-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { userAccountAll as schema } from '../../../response/coinbase/user/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getaccounts
 * @param {string} limit The number of accounts to display per page (49 by default, maximum 250).
 * @param {string} cursor Allows to get response with accounts at specific page.
 * @param {string} retail_portfolio_id Only applicable for legacy keys.
 * @returns {Promise<Object>} JSON data from response.
 */
const userAccountAll = (limit, cursor, retail_portfolio_id) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { USER_ACCOUNT_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(USER_ACCOUNT_ALL, defaults, {
      warnRequired: { cursor, limit, retail_portfolio_id },
    }),
    json = get(USER_ACCOUNT_ALL, schema, security, data);

  return json;
};

export default userAccountAll;
