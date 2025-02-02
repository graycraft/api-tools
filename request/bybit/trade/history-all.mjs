/**
 * Handle Bybit API endpoint, with all trade history.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 * @typedef {import("#types/bybit.d.js").side} side
 * @typedef {import("#types/response/bybit/trade/history-all.d.js").default} TradeHistoryAll
 * @module request/bybit/trade/history-all
 */

import { tradeHistoryAll as schema } from '#res/bybit/trade/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {side[0] | side[1]} [side] Not supported by the API, must be filtered while parsing.
 * @param {string} [symbol] Symbol name.
 * @param {string} [limit] Limit data per page (default is 50, maximum 100).
 * @param {{
 *   baseCoin?, category?, cursor?, endTime?, execType?, orderLinkId?, startTime?
 * }} options Optional parameters.
 * @returns {Promise<TradeHistoryAll>} JSON data from response.
 */
const tradeHistoryAll = async (
  side,
  symbol,
  limit,
  { baseCoin, category, cursor, endTime, execType /* , orderId */, orderLinkId, startTime } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
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
