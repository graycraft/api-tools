/**
 * Handle Coinbase Advanced API request, with portfolio breakdown of a user by portfolio UUID.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getportfoliobreakdown
 * @typedef {import("#types/response/coinbase/user/portfolio-one.js").default} UserPortfolioOne
 * @module request/coinbase/user/portfolio-one
 */

import { userPortfolioOne as schema } from '#res/coinbase/user/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * This endpoint requires the "view" permission (for that portfolio).
 * @param {string} portfolio_uuid Portfolio UUID.
 * @param {string} [currency] Calculate values in specified currency.
 * @returns {Promise<UserPortfolioOne>} JSON data from response.
 */
const userPortfolioOne = async (portfolio_uuid, currency) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { USER_PORTFOLIO_ONE },
    } = config,
    {
      authentication: { security },
      user,
      user: { portfolio },
    } = settings,
    data = validate(USER_PORTFOLIO_ONE, {
      defaults: {
        portfolio_uuid: user[portfolio].uuid,
      },
      optional: { portfolio_uuid },
      required: { currency },
    }),
    json = await get(USER_PORTFOLIO_ONE, schema, security, data);

  return json;
};

export default userPortfolioOne;
