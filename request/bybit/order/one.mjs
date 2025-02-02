/**
 * Handle Bybit API one order endpoint, with unfilled or partially filled orders by order identifier.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 * @typedef {import("#types/response/bybit/order/one.d.js").default} OrderOne
 * @module request/bybit/order/one
 */

import { orderOne as schema } from '#res/bybit/order/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Also supports querying recent 500 closed status (cancelled or filled) orders by `openOnly` parameter.
 * @param {string} orderId Order identifier.
 * @param {{
 *   baseCoin?, category?, cursor?, limit?, openOnly?, orderFilter?, orderLinkId?, settleCoin?, side?, symbol?
 * }} options Optional parameters.
 * @returns {Promise<OrderOne>} JSON data from response.
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
  const { config, settings } = global.apiTools.bybit,
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
