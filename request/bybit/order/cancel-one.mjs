/**
 * Handle Bybit API order cancel one endpoint.
 * 
 * @module request/bybit/order/cancel-one
 */

import bybitPost from "../post.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-order
 */
const orderCancelOne = (orderId, { category, orderFilter, orderLinkId, symbol } = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_CANCEL_ONE } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(ORDER_CANCEL_ONE, defaults,
      { throwRequired: { orderId } },
      { warnRequired: { category, orderFilter, orderLinkId, symbol } },
    );

  return bybitPost(sign, ORDER_CANCEL_ONE, data)
};

export default orderCancelOne;
