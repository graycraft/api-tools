/**
 * Handle Bybit API all order endpoint, with unfilled or partially filled orders.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 * @module request/bybit/order/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderAll as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * Also supports querying recent 500 closed status (cancelled or filled) orders by `openOnly` parameter.
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#stopordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} symbol Symbol name.
 * @param {string} side Not supported by the API, must be filtered while parsing.
 * @param {string} limit Limit for data size per page (default is 20, maximum 50).
 * @param {{
 *   baseCoin?, category?, cursor?, openOnly?, orderFilter?, orderLinkId?, settleCoin?, stopOrderType?
 * }} rest
 * @returns {Promise<Object>} JSON data from response.
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
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      ORDER_ALL,
      defaults,
      { warnOptional: { category } },
      {
        warnRequired: {
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
      },
    ),
    json = await get(ORDER_ALL, schema, security, data);

  return json;
};

export default orderAll;
