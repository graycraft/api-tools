/**
 * Handle Coinbase Advanced API cancel all orders endpoint.
 *
 * @see https://coinbase-exchange.github.io/docs/v5/order/cancel-order
 * @module request/coinbase/order/cancel-all
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderCancel as schema } from '../../../response/coinbase/order/schema.mjs';

/**
 * The maximum number of order_ids that can be cancelled per request is 100.
 * @param {string} order_ids
 * @returns {Promise<{ results: { order_id: string, success: boolean } }>}
 */
const orderCancel = async (order_ids) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_CANCEL },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(ORDER_CANCEL, {
      throw: { order_ids: [order_ids] },
    }),
    json = await post(ORDER_CANCEL, schema, security, data);

  return json;
};

export default orderCancel;
