/**
 * Handle Coinbase Advanced API place limit buy order endpoint.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 * @module request/coinbase/order/limit-buy
 */

import nodeCrypto from 'node:crypto';
import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderLimitBuy as schema } from '../../../response/coinbase/order/schema.mjs';

/**
 * The maximum number of open orders allowed per `product_id` is 500.
 * A buy Order will execute at or lower than the limit price.
 * A sell Order will execute at or higher than the limit price.
 * @param {string} base_size Size of the first asset in a trading pair.
 * @param {string} limit_price Price, that an order should be executed at.
 * @param {string} [product_id] Trading pair (e.g. "BTC-USD").
 * @param {{ client_order_id? }} rest
 * @returns {Promise<{ success: boolean, success_response: { order_id: string, product_id: string } }>}
 */
const orderLimitBuy = async (
  base_size,
  limit_price,
  product_id,
  { client_order_id /* , side */ } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE: { SIDE },
    } = config,
    {
      authentication: { security },
      currency: { base, quote },
    } = settings,
    data = validate(ORDER_PLACE, {
      defaults: {
        client_order_id: nodeCrypto.randomUUID(),
        product_id: base + '-' + quote,
        side: SIDE.BUY,
      },
      optional: { client_order_id, product_id },
      throw: {
        order_configuration: {
          [ORDER.LIMIT]: {
            base_size,
            limit_price,
          },
        },
      },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderLimitBuy;
