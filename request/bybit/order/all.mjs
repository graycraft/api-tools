/**
 * Handle Bybit API all orders request, with unfilled or partially filled orders.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 * @typedef {import("#types/response/bybit/order/all.d.js").default} OrderAll
 * @module request/bybit/order/all
 */

import { orderAll as schema } from '#res/bybit/order/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * Also supports querying recent 500 closed status (cancelled or filled) orders by `openOnly` parameter.
 * @param {string} symbol Currency pair code (e.g. "ETHUSDC").
 * @param {string} side Not supported by the API, must be filtered while parsing.
 * @param {string} limit Limit for data size per page (default: 20, maximum: 50).
 * @param {{
 *   baseCoin?, category?, cursor?, openOnly?, orderFilter?, orderLinkId?, settleCoin?, stopOrderType?
 * }} options Optional parameters.
 * @returns {Promise<OrderAll>} JSON data from response.
 */
const orderAll = async (
  symbol,
  side,
  limit,
  {
    baseCoin,
    category,
    cursor,
    openOnly,
    orderFilter /* , orderId */,
    orderLinkId,
    settleCoin,
  } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { ORDER_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_ALL, {
      defaults: {
        category: account.category,
      },
      optional: { category },
      required: {
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
      },
    }),
    json = await get(ORDER_ALL, schema, security, data);

  return json;
};

export default orderAll;
