/**
 * Handle Bybit API request, with cancel one order by order identifier or `orderLinkId`.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-order
 * @typedef {import("#types/response/bybit/order/cancel-one.js").default} JOrderCancelOne
 * @module request/bybit/order/cancel-one
 */

import { orderCancelOne as schema } from '#res/bybit/order/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} orderId Order identifier.
 * @param {{
 *   category?: string;
 *   orderFilter?: string;
 *   orderLinkId?: string;
 *   symbol?: string;
 * }} options Optional parameters.
 * @returns {Promise<JOrderCancelOne>} JSON data from response.
 */
const orderCancelOne = async (orderId, { category, orderFilter, orderLinkId, symbol } = {}) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { ORDER_CANCEL_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_CANCEL_ONE, {
      defaults: {
        category: account.category,
      },
      required: { category, orderFilter, orderLinkId, symbol },
      throw: { orderId },
    }),
    json = await post(ORDER_CANCEL_ONE, schema, security, data);

  return json;
};

export default orderCancelOne;
