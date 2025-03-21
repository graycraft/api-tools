/**
 * Handle Bybit API one order history request by order identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 * @typedef {import("#types/response/bybit/order/history-one.js").default} JOrderHistoryOne
 * @module request/bybit/order/history-one
 */

import { orderHistoryOne as schema } from '#res/bybit/order/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Because order creation and cancellation is asynchronous, the data returned from this endpoint may delay.
 * To get real-time order information, it is better to request `ORDER_ALL` or rely on the web socket stream.
 * Limit data per page (default: 20, maximum: 50).
 * @param {string} orderId Order identifier.
 * @param {{
 *   baseCoin?: string;
 *   category?: string;
 *   cursor?: string;
 *   endTime?: string;
 *   limit?: string;
 *   openOnly?: string;
 *   orderFilter?: string;
 *   orderLinkId?: string;
 *   orderStatus?: string;
 *   settleCoin?: string;
 *   startTime?: string;
 *   symbol?: string;
 * }} options Optional parameters.
 * @returns {Promise<JOrderHistoryOne>} JSON data from response.
 */
const orderHistoryOne = async (
  orderId,
  {
    baseCoin,
    category,
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
  } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { ORDER_HISTORY_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_HISTORY_ONE, {
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
        orderId,
        orderLinkId,
        orderStatus,
        settleCoin,
        startTime,
        symbol,
      },
      throw: { orderId },
    }),
    json = await get(ORDER_HISTORY_ONE, schema, security, data);

  return json;
};

export default orderHistoryOne;
