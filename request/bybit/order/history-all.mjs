/**
 * Handle Bybit API history all endpoint.
 *
 * @module request/bybit/order/history-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderHistoryAll as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 * @param {string} symbol
 * @param {string} limit
 * @param {{
 *   baseCoin?, category?, cursor?, endTime?, openOnly?, orderFilter?, orderId?, orderLinkId?, orderStatus?,
 *   settleCoin?, startTime?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderHistoryAll = (
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
    json = get(ORDER_HISTORY_ALL, schema, security, data);

  return json;
};

export default orderHistoryAll;
