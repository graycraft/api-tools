/**
 * Handle Bybit API order cancel one endpoint by order identifier.
 *
 * @module request/bybit/order/cancel-one
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderCancelOne as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-order
 * @param {string} orderId
 * @param {{ category?, orderFilter?, orderLinkId?, symbol? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderCancelOne = (orderId, { category, orderFilter, orderLinkId, symbol } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_CANCEL_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      ORDER_CANCEL_ONE,
      defaults,
      { throwRequired: { orderId } },
      { warnRequired: { category, orderFilter, orderLinkId, symbol } },
    ),
    json = post(ORDER_CANCEL_ONE, schema, security, data);

  return json;
};

export default orderCancelOne;
