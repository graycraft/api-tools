/**
 * Handle Bybit API request, with all trade history.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 * @typedef {import("#types/bybit.ts").orderSide} side
 * @typedef {import("#types/response/bybit/trade/history-all.js").default} JTradeHistoryAll
 * @module request/bybit/trade/history-all
 */

import { tradeHistoryAll as schema } from '#res/bybit/trade/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {side[0] | side[1]} [side] Not supported by the API, must be filtered while parsing.
 * @param {string} [symbol] Currency pair code (e.g. "ETHUSDC").
 * @param {string} [limit] Limit data per page (default: 50, maximum: 100).
 * @param {{
 *   baseCoin?: string;
 *   category?: string;
 *   cursor?: string;
 *   endTime?: string;
 *   execType?: string;
 *   orderLinkId?: string;
 *   startTime?: string;
 * }} options Optional parameters.
 * @returns {Promise<JTradeHistoryAll>} JSON data from response.
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
