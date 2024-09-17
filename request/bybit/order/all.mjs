/**
 * Handle Bybit API order all endpoint.
 *
 * @module request/bybit/order/all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderAll as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 * @param {string} symbol
 * @param {string} side
 * @param {string} limit
 * @param {{
 *   baseCoin?, category?, cursor?, openOnly?, orderFilter?, orderLinkId?, settleCoin?, stopOrderType?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderAll = (
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
    json = get(ORDER_ALL, schema, security, data);

  return json;
};

export default orderAll;
