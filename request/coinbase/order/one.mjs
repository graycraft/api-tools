/**
 * Handle Coinbase Advanced API one order request, by order UUID.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_gethistoricalorder
 * @typedef {import("#types/response/coinbase/order/one.d.js").default} OrderOne
 * @module request/coinbase/order/one
 */

import { orderOne as schema } from '#res/coinbase/order/schema.mjs';

import get from '../get.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} order_uuid Order UUID.
 * @returns {Promise<OrderOne>} JSON data from response.
 */
const orderOne = async (order_uuid) => {
  const { config, settings } = global.apiTools.coinbase,
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
