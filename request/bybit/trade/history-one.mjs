/**
 * Handle Bybit API request, with one trade history entry by order identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 * @typedef {import("#types/response/bybit/trade/history-one.js").default} JTradeHistoryOne
 * @module request/bybit/trade/history-one
 */

import { tradeHistoryOne as schema } from '#res/bybit/trade/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} orderId Order identifier.
 * @param {{
 *   baseCoin?: string;
 *   category?: string;
 *   cursor?: string;
 *   endTime?: string;
 *   execType?: string;
 *   limit?: string;
 *   orderLinkId?: string;
 *   side?: string;
 *   startTime?: string;
 *   symbol?: string;
 * }} options Optional parameters.
 * @returns {Promise<JTradeHistoryOne>} JSON data from response.
 */
const tradeHistoryOne = async (
  orderId,
  {
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
  } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { TRADE_HISTORY_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(TRADE_HISTORY_ONE, {
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
      throw: { orderId },
    }),
    json = await get(TRADE_HISTORY_ONE, schema, security, data);

  return json;
};

export default tradeHistoryOne;
