/**
 * Handle Bybit API order one endpoint by order identifier.
 *
 * @module request/bybit/order/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderOne as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 * @param {string} orderId
 * @param {{
 *   baseCoin?, category?, cursor?, limit?, openOnly?, orderFilter?, orderLinkId?, settleCoin?, side?, symbol?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderOne = (
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
    defaults = {
      category: account.category,
    },
    data = validate(
      ORDER_ONE,
      defaults,
      { throwRequired: { orderId } },
      { warnOptional: { category, symbol } },
      {
        warnRequired: {
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
      },
    ),
    json = get(ORDER_ONE, schema, security, data);

  return json;
};

export default orderOne;
