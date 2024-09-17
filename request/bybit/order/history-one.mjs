/**
 * Handle Bybit API history one endpoint by order identifier.
 *
 * @module request/bybit/order/history-one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { historyOne as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 * @param {string} orderId
 * @param {string} symbol
 * @param {string} limit
 * @param {{
 *   baseCoin?, category?, cursor?, endTime?, openOnly?, orderFilter?, orderLinkId?, orderStatus?, settleCoin?,
 *   startTime?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderHistoryOne = (
  orderId,
  symbol,
  limit,
  {
    baseCoin,
    category,
    cursor,
    endTime,
    openOnly,
    orderFilter,
    orderLinkId,
    orderStatus,
    settleCoin,
    startTime,
  } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_HISTORY_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      ORDER_HISTORY_ONE,
      defaults,
      { throwRequired: { orderId } },
      { warnOptional: { category } },
      {
        warnRequired: {
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
      },
    ),
    json = get(ORDER_HISTORY_ONE, schema, security, data);

  return json;
};

export default orderHistoryOne;
