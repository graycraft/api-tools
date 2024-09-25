/**
 * Handle Coinbase Advanced API endpoint for all portfolios of a user.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfolios
 * @module request/coinbase/user/portfolio-all
 */

import { userPortfolioAll as schema } from '#res/coinbase/user/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {"CONSUMER" | "DEFAULT" | "INTX" | "UNDEFINED"} portfolio_type
 * @returns {Promise<{ portfolios: [{ uuid: string }] }>} JSON data from response.
 */
const userPortfolioAll = (portfolio_type) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { USER_PORTFOLIO_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(USER_PORTFOLIO_ALL, {
      required: { portfolio_type },
    }),
    json = get(USER_PORTFOLIO_ALL, schema, security, data);

  return json;
};

export default userPortfolioAll;
