/**
 * Handle Bybit API one order history endpoint by order identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 * @typedef {import("#types/response/bybit/order/history-one.d.js").default} OrderHistoryOne
 * @module request/bybit/order/history-one
 */

import { orderHistoryOne as schema } from '#res/bybit/order/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Because order creation and cancellation is asynchronous, the data returned from this endpoint may delay.
 * To get real-time order information, it is better to request `ORDER_ALL` or rely on the web socket stream.
 * Limit data per page - default is 20, maximum 50.
 * @param {string} orderId Order identifier.
 * @param {{
 *   baseCoin?, category?, cursor?, endTime?, limit?,openOnly?, orderFilter?, orderLinkId?,
 *   orderStatus?, settleCoin?, startTime?, symbol?
 * }} options
 * @returns {Promise<OrderHistoryOne>} JSON data from response.
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
