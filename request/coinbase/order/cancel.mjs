/**
 * Handle Coinbase Advanced API cancel order endpoint by one or more order identifiers.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_cancelorders
 * @typedef {import("#types/response/coinbase/order/cancel.d.js").default} OrderCancel
 * @module request/coinbase/order/cancel
 */

import { orderCancel as schema } from '#res/coinbase/order/schema.mjs';
import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * The maximum number of order_ids that can be cancelled per request is 100.
 * @param {string} order_ids The order identifiers that cancel requests should be initiated for.
 * @returns {Promise<OrderCancel>} JSON data from response.
 */
const orderCancel = async (order_ids) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      PATH: { ORDER_CANCEL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(ORDER_CANCEL, {
      throw: { order_ids: order_ids.split(',') },
    }),
    json = await post(ORDER_CANCEL, schema, security, data);

  return json;
};

export default orderCancel;
