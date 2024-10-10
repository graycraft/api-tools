/**
 * Handle Bybit API endpoint, with cancel all open orders.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-all
 * @typedef {import("#types/response/bybit/order/cancel-all.d.js").default} OrderCancelAll
 * @module request/bybit/order/cancel-all
 */

import { orderCancelAll as schema } from '#res/bybit/order/schema.mjs';
import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} [symbol] Symbol name.
 * @param {{ baseCoin?, category?, orderFilter?, orderLinkId?, settleCoin?, stopOrderType? }} options
 * @returns {Promise<OrderCancelAll>} JSON data from response.
 */
const orderCancelAll = async (
  symbol,
  { baseCoin, category, orderFilter, orderLinkId, settleCoin, stopOrderType } = {},
) => {
  const { config, settings } = global.apiTools.bybit,
    {
      PATH: { ORDER_CANCEL_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_CANCEL_ALL, {
      defaults: {
        category: account.category,
      },
      optional: {
        baseCoin,
        category,
        orderFilter,
        orderLinkId,
        settleCoin,
        stopOrderType,
      },
      required: { symbol },
    }),
    json = await post(ORDER_CANCEL_ALL, schema, security, data);

  return json;
};

export default orderCancelAll;
