/**
 * Handle Coinbase Advanced API order market buy endpoint.
 * 
 * @module request/coinbase/order/market-buy
 */

import nodeCrypto from "node:crypto";
import coinbasePost from "../post.mjs";
import isValidParams from "../validate.mjs";
import validateParams from "../../validate.mjs";

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 */
const orderMarketBuy = (qty, price, symbol, {} = {}) => {
  const { config, settings } = global.apiTools,
    {
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE,
    } = config,
    {
      authentication: { sign },
      currency: { base, quote }
    } = settings,
    defaults = {
      client_order_id: nodeCrypto.randomUUID(),
      order_configuration: {
        [ORDER.LIMIT]: {
          base_size: qty,
          limit_price: price,
        },
      },
      product_id: base + "-" + quote,
      side: TRADE.BUY,
    },
    data = validateParams(
      ORDER_PLACE, isValidParams, defaults,
      /** @todo Fix proto: (line 1:124): unknown field "qty" */
      //{ throwRequired: { qty, price } },
      { warnOptional: { symbol } },
    );

  return coinbasePost(sign, ORDER_PLACE, data)
};

export default orderMarketBuy;
