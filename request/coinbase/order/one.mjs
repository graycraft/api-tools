/**
 * Handle Coinbase Advanced API one order endpoint, by order UUID.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorder
 * @module request/coinbase/order/one
 */

import { orderOne as schema } from '#res/coinbase/order/schema.mjs';
import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} order_uuid Order UUID.
 * @returns {Promise<{ order: { order_id: string, product_id: string } }>} JSON data from response.
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
