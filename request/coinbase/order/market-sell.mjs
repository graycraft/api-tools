/**
 * Handle Coinbase Advanced API place market sell order endpoint.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 * @module request/coinbase/order/market-sell
 */

import nodeCrypto from 'node:crypto';
import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderMarketSell as schema } from '../../../response/coinbase/order/schema.mjs';

/**
 * The maximum number of open orders allowed per `product_id` is 500.
 * A buy Order will execute at or lower than the market price.
 * A sell Order will execute at or higher than the market price.
 * Trying to use `quote_size` API responses, despite of documentation allowing it:
 * OK: {
 *   data: {
 *     success: false,
 *     error_response: {
 *       error: 'UNSUPPORTED_ORDER_CONFIGURATION',
 *       error_details: '',
 *       message: 'rpc error: code = InvalidArgument desc = Market sells must be parameterized in base currency',
 *       preview_failure_reason: 'PREVIEW_INVALID_ORDER_CONFIG'
 *     },
 *     order_configuration: { market_market_ioc: { quote_size: '1' } }
 *   }
 * }
 * @param {string} base_size Size of the first asset in a trading pair.
 * @param {string} [product_id] Trading pair (e.g. "BTC-USD").
 * @param {{ client_order_id? }} rest
 * @returns {Promise<{ success: boolean, success_response: { order_id: string, product_id: string } }>}
 */
const orderMarketSell = async (base_size, product_id, { client_order_id /* , side */ } = {}) => {
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
        side: SIDE.SELL,
      },
      optional: { client_order_id, product_id },
      throw: {
        order_configuration: {
          [ORDER.MARKET]: {
            base_size,
          },
        },
      },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderMarketSell;
