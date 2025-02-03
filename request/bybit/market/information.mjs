/**
 * Handle Bybit API market information endpoint, with instrument specification of online trading pairs.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/instrument
 * @typedef {import("#types/bybit.d.js").category} category
 * @typedef {import("#types/response/bybit/market/information.d.js").default} MarketInformation
 * @module request/bybit/market/information
 */

import { marketInformation as schema } from '#res/bybit/market/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Pagination is not supported for category spot, so `cursor` and `limit` cannot be used in this case.
 * When query by `baseCoin`, regardless of category linear or inverse,
 * the result will have USDT perpetual, USDC contract and Inverse contract symbols.
 * `baseCoin` is applicable to `linear`, `inverse` and `option` category only.
 * @param {category} category Product type.
 * @param {{ baseCoin?, cursor?, limit?, status?, symbol? }} options Optional parameters.
 * @returns {Promise<MarketInformation>} JSON data from response.
 */
const marketInformation = async (category, { baseCoin, cursor, limit, status, symbol } = {}) => {
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      PATH: { MARKET_INFORMATION },
    } = config,
    {
      currency: { base, quote },
    } = prefs,
    { account } = settings,
    data = validate(MARKET_INFORMATION, {
      defaults: {
        category: account.category,
        symbol: base + quote,
      },
      optional: { category, symbol },
      required: { baseCoin, category, cursor, limit, status },
    }),
    json = await get(MARKET_INFORMATION, schema, null, data);

  return json;
};

export default marketInformation;
