/**
 * Handle Bybit API one order endpoint, with unfilled or partially filled orders by order identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 * @module request/bybit/order/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderOne as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * Also supports querying recent 500 closed status (cancelled or filled) orders by `openOnly` parameter.
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#stopordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} orderId Order identifier.
 * @param {{
 *   baseCoin?, category?, cursor?, limit?, openOnly?, orderFilter?, orderLinkId?, settleCoin?, side?, symbol?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderOne = async (
  orderId,
  {
    baseCoin,
    category,
    cursor,
    limit,
    openOnly,
    orderFilter,
    orderLinkId,
    settleCoin,
    side,
    symbol,
  } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_ONE, {
      defaults: {
        category: account.category,
      },
      optional: { category, symbol },
      required: {
        baseCoin,
        category,
        cursor,
        limit,
        openOnly,
        orderFilter,
        orderId,
        orderLinkId,
        settleCoin,
        side,
        symbol,
      },
      throw: { orderId },
    }),
    json = await get(ORDER_ONE, schema, security, data);

  return json;
};

export default orderOne;
