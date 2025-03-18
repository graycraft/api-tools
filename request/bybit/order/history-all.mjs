/**
 * Handle Bybit API all orders history request.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 * @typedef {import("#types/response/bybit/order/history-all.js").default} JOrderHistoryAll
 * @module request/bybit/order/history-all
 */

import { orderHistoryAll as schema } from '#res/bybit/order/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Because order creation and cancellation is asynchronous, the data returned from this endpoint may delay.
 * To get real-time order information, it is better to request `ORDER_ALL` endpoint or rely on the web socket stream.
 * @param {string} [symbol] Currency pair code (e.g. "ETHUSDC").
 * @param {string} [limit] Limit data per page (default: 20, maximum: 50).
 * @param {{
 *   baseCoin?: string;
 *   category?: string;
 *   cursor?: string;
 *   endTime?: string;
 *   openOnly?: string;
 *   orderFilter?: string;
 *   orderId?: string;
 *   orderLinkId?: string;
 *   orderStatus?: string;
 *   settleCoin?: string;
 *   startTime?: string;
 * }} options Optional parameters.
 * @returns {Promise<JOrderHistoryAll>} JSON data from response.
 */
const orderHistoryAll = async (
  symbol,
  limit,
  {
    baseCoin,
    category,
    cursor,
    endTime,
    openOnly,
    orderFilter,
    /* orderId, */
    orderLinkId,
    orderStatus,
    settleCoin,
    startTime,
  } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { ORDER_HISTORY_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_HISTORY_ALL, {
      defaults: {
        category: account.category,
      },
      optional: { category },
      required: {
        baseCoin,
        cursor,
        endTime,
        limit,
        openOnly,
        orderFilter,
        orderLinkId,
        orderStatus,
        settleCoin,
        startTime,
        symbol,
      },
    }),
    json = await get(ORDER_HISTORY_ALL, schema, security, data);

  return json;
};

export default orderHistoryAll;
