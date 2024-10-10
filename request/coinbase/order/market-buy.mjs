/**
 * Handle Coinbase Advanced API place market buy order endpoint.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 * @typedef {import("#types/response/coinbase/order/market-buy.d.js").default} OrderMarketBuy
 * @module request/coinbase/order/market-buy
 */

import nodeCrypto from 'node:crypto';
import { orderMarketBuy as schema } from '#res/coinbase/order/schema.mjs';
import post from '../post.mjs';
import validate, { pair } from '../validate.mjs';

/**
 * The maximum number of open orders allowed per `product_id` is 500.
 * A buy Order will execute at or lower than the market price.
 * A sell Order will execute at or higher than the market price.
 * @param {string} quote_size Size of the first asset in a trading pair.
 * @param {string} [product_id] Trading pair (e.g. "BTC-USD").
 * @param {{
 *   client_order_id?, end_time?, leverage?, limit_limit_fok?, limit_limit_gtc?,
 *   limit_limit_gtd?, market_market_ioc?, margin_type?, post_only?, preview_id?,
 *   sor_limit_ioc?, stop_direction?, stop_limit_stop_limit_gtc?,
 *   stop_limit_stop_limit_gtd?, stop_price?, stop_trigger_price?,
 *   trigger_bracket_gtc?, trigger_bracket_gtd?
 * }} options
 * @returns {Promise<OrderMarketBuy>} JSON data from response.
 */
const orderMarketBuy = async (
  quote_size,
  product_id,
  {
    client_order_id,
    end_time,
    leverage,
    limit_limit_fok,
    limit_limit_gtc,
    limit_limit_gtd,
    market_market_ioc,
    margin_type,
    post_only,
    preview_id,
    /* side, */
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
      PATH: { ORDER_PLACE },
      TRADE: { SIDE },
    } = config,
    {
      authentication: { security },
      asset: { base, quote },
    } = settings,
    data = validate(ORDER_PLACE, {
      defaults: {
        client_order_id: nodeCrypto.randomUUID(),
        product_id: pair(base.code, quote.code),
        side: SIDE.BUY,
      },
      optional: { client_order_id, product_id },
      throw: {
        order_configuration: /** @type {any} */ ({
          [ORDER.MARKET]: {
            quote_size,
          },
        }),
      },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderMarketBuy;
