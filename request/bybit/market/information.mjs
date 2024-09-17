/**
 * Handle Bybit API market information endpoint.
 *
 * @module request/bybit/market/information
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketInformation as schema } from '../../../response/bybit/market/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/market/instrument
 * @param {string} symbol
 * @param {string} limit
 * @param {{ baseCoin?, category?, cursor?, status? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const marketInformation = (symbol, limit, { baseCoin, category, cursor, status } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_INFORMATION },
    } = config,
    { account } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      MARKET_INFORMATION,
      defaults,
      { warnOptional: { symbol } },
      { warnRequired: { baseCoin, category, cursor, limit, status, symbol } },
    ),
    json = get(MARKET_INFORMATION, schema, null, data);

  return json;
};

export default marketInformation;
