/**
 * Handle Bybit API market information endpoint, with instrument specification of online trading pairs.
 *
 * @see https://bybit-exchange.github.io/docs/v5/market/instrument
 * @module request/bybit/market/information
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketInformation as schema } from '../../../response/bybit/market/schema.mjs';

/**
 * Pagination is not supported for category spot, so `cursor` and `limit` cannot be used in this case.
 * When query by `baseCoin`, regardless of category linear or inverse,
 * the result will have USDT perpetual, USDC contract and Inverse contract symbols.
 * `baseCoin` is applicable to `linear`, `inverse` and `option` category only.
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#status
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {"inverse" | "linear" | "option" | "spot"} category Product type.
 * @param {{ baseCoin?, cursor?, limit?, status?, symbol? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const marketInformation = async (category, { baseCoin, cursor, limit, status, symbol } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_INFORMATION },
    } = config,
    { account, currency } = settings,
    { base, quote } = currency,
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
