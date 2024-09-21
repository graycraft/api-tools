/**
 * Handle Coinbase Advanced API one orders endpoint.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorders
 * @module request/coinbase/order/one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { orderOne as schema } from '../../../response/coinbase/order/schema.mjs';

/**
 * @param {string} order_uuid Order UUID.
 * @returns {Promise<{ order: { order_id: string, product_id: string } }>}
 */
const orderOne = async (order_uuid) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_ONE },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(ORDER_ONE, {
      throw: { order_uuid },
    }),
    json = await get(ORDER_ONE, schema, security, data);

  return json;
};

export default orderOne;
