/**
 * Handle Coinbase Advanced API request, with placing market sell order.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 * @typedef {import("#types/response/coinbase/order/market-sell.js").default} JOrderMarketSell
 * @module request/coinbase/order/market-sell
 */

import nodeCrypto from 'node:crypto';

import { orderMarketSell as schema } from '#res/coinbase/order/schema.mjs';

import post from '../post.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * The maximum number of open orders allowed per `product_id` is 500.
 * A buy Order will execute at or lower than the market price.
 * A sell Order will execute at or higher than the market price.
 * Despite of documentation allowing `quote_size`, trying to use it API responses error:
 * {
 *   OK: {
 *     data: {
 *       success: false,
 *       error_response: {
 *         error: 'UNSUPPORTED_ORDER_CONFIGURATION',
 *         error_details: '',
 *         message: 'rpc error: code = InvalidArgument desc = Market sells must be parameterized in base currency',
 *         preview_failure_reason: 'PREVIEW_INVALID_ORDER_CONFIG'
 *       },
 *       order_configuration: { market_market_ioc: { quote_size: '1' } }
 *     }
 *   }
 * }
 * @param {string} base_size Size of the first asset in a trading pair.
 * @param {string} [product_id] Currency pair code (e.g. "ETH-USDC").
 * @param {{
 *   client_order_id?: string; end_time?: string; leverage?: string; limit_limit_fok?: string; limit_limit_gtc?: string;
 *   limit_limit_gtd?: string; market_market_ioc?: string; margin_type?: string; post_only?: string;
 *   preview_id?: string; quote_size?: string; sor_limit_ioc?: string; stop_direction?: string;
 *   stop_limit_stop_limit_gtc?: string; stop_limit_stop_limit_gtd?: string; stop_price?: string;
 *   stop_trigger_price?: string; trigger_bracket_gtc?: string; trigger_bracket_gtd?: string;
 * }} options Optional parameters.
 * @returns {Promise<JOrderMarketSell>} JSON data from response.
 */
const orderMarketSell = async (
  base_size,
  product_id,
  {
    client_order_id,
    end_time,
    leverage,
    limit_limit_fok,
    limit_limit_gtc,
    limit_limit_gtd,
    // limit_price,
    market_market_ioc,
    margin_type,
    post_only,
    preview_id,
    // side,
    sor_limit_ioc,
    stop_direction,
    stop_limit_stop_limit_gtc,
    stop_limit_stop_limit_gtd,
    stop_price,
    stop_trigger_price,
    trigger_bracket_gtc,
    trigger_bracket_gtd,
  } = {},
) => {
  const { config, settings } = global.apiTools.coinbase,
    {
      ORDER,
      ORDER: { SIDE },
      PATH: { ORDER_PLACE },
      PRODUCT: { BASE, QUOTE },
    } = config,
    {
      authentication: { security },
    } = settings,
    data = validate(ORDER_PLACE, {
      defaults: {
        client_order_id: nodeCrypto.randomUUID(),
        product_id: pair(BASE.CODE, QUOTE.CODE),
        side: SIDE.SELL,
      },
      optional: { client_order_id, product_id },
      throw: {
        order_configuration: /** @type {any} */ ({
          [ORDER.MARKET]: {
            base_size,
          },
        }),
      },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderMarketSell;
