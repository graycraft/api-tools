/**
 * Handle Bybit API endpoint, with all trade history.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 * @module request/bybit/trade/history-all
 */

import { tradeHistoryAll as schema } from '#res/bybit/trade/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#exectype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} [side] Not supported by the API, must be filtered while parsing.
 * @param {string} [symbol] Symbol name.
 * @param {string} [limit] Limit data per page (default is 50, maximum 100).
 * @param {{ baseCoin?, category?, cursor?, endTime?, execType?, orderLinkId?, startTime? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const tradeHistoryAll = async (
  side,
  symbol,
  limit,
  { baseCoin, category, cursor, endTime, execType /* , orderId */, orderLinkId, startTime } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRADE_HISTORY_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRADE_HISTORY_ALL, {
      defaults: {
        category: account.category,
      },
      optional: { category },
      required: {
        baseCoin,
        category,
        cursor,
        endTime,
        execType,
        limit,
        orderLinkId,
        side,
        startTime,
        symbol,
      },
    }),
    json = await get(TRADE_HISTORY_ALL, schema, security, data);

  return json;
};

export default tradeHistoryAll;
