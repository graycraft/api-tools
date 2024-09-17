/**
 * Handle Coinbase Advanced API endpoint for ONE portfolio breakdown of a user by portfolio UUID.
 *
 * @module request/coinbase/user/portfolio-one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { userPortfolioOne as schema } from '../../../response/coinbase/user/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfoliobreakdown
 * @param {string} portfolio_uuid Portfolio UUID.
 * @param {string} currency Calculate values in specified currency.
 * @returns {Promise<Object>} JSON data from response.
 */
const userPortfolioOne = async (portfolio_uuid, currency) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { USER_PORTFOLIO_ONE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    defaults = {
      portfolio_uuid: user[portfolio],
    },
    data = validate(USER_PORTFOLIO_ONE, defaults, { warnRequired: { currency, portfolio_uuid } }),
    json = await get(USER_PORTFOLIO_ONE, schema, security, data);

  return json;
};

export default userPortfolioOne;
