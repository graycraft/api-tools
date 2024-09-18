/**
 * Handle Bybit API all order history endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 * @module request/bybit/order/history-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderHistoryAll as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * Because order creation and cancellation is asynchronous, the data returned from this endpoint may delay.
 * To get real-time order information, it is better to request `ORDER_ALL` endpoint or rely on the web socket stream.
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#orderstatus
 * @see https://bybit-exchange.github.io/docs/v5/enum#stopordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} [symbol] Symbol name.
 * @param {string} [limit] Limit data per page (default is 20, maximum 50)
 * @param {{
 *   baseCoin?, category?, cursor?, endTime?, openOnly?, orderFilter?, orderId?,
 *   orderLinkId?, orderStatus?, settleCoin?, startTime?
 * }} rest
 * @returns {Promise<Object>} JSON data from response.
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
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_HISTORY_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      ORDER_HISTORY_ALL,
      defaults,
      { warnOptional: { category } },
      {
        warnRequired: {
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
      },
    ),
    json = await get(ORDER_HISTORY_ALL, schema, security, data);

  return json;
};

export default orderHistoryAll;
