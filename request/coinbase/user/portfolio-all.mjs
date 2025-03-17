/**
 * Handle Coinbase Advanced API request for all portfolios of a user.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfolios
 * @typedef {import("#types/coinbase.ts").userPortfolio} userPortfolio
 * @typedef {import("#types/response/coinbase/user/portfolio-all.js").default} JUserPortfolioAll
 * @module request/coinbase/user/portfolio-all
 */

import { userPortfolioAll as schema } from '#res/coinbase/user/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {userPortfolio} portfolio_type
 * @returns {Promise<JUserPortfolioAll>} JSON data from response.
 */
const userPortfolioAll = async (portfolio_type) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { USER_PORTFOLIO_ALL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(USER_PORTFOLIO_ALL, {
      required: { portfolio_type },
    }),
    json = await get(USER_PORTFOLIO_ALL, schema, security, data);

  return json;
};

export default userPortfolioAll;
