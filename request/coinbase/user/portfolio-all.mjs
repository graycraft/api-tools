/**
 * Handle Coinbase Advanced API endpoint for all portfolios of a user.
 *
 * @module request/coinbase/user/portfolio-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { userPortfolioAll as schema } from '../../../response/coinbase/user/schema.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfolios
 * @param {"CONSUMER" | "DEFAULT" | "INTX" | "UNDEFINED"} portfolio_type
 * @returns {Promise<Object>} JSON data from response.
 */
const userPortfolioAll = (portfolio_type) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { USER_PORTFOLIO_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    defaults = {},
    data = validate(USER_PORTFOLIO_ALL, defaults, {
      warnRequired: { portfolio_type },
    }),
    json = get(USER_PORTFOLIO_ALL, schema, security, data);

  return json;
};

export default userPortfolioAll;
