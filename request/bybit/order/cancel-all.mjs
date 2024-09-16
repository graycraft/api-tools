/**
 * Handle Bybit API order cancel all endpoint.
 * 
 * @module request/bybit/order/cancel-all
 */

import bybitPost from "../post.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-all
 */
const orderCancelAll = (symbol, {
  baseCoin, category, orderFilter, settleCoin, stopOrderType
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_CANCEL_ALL } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(ORDER_CANCEL_ALL, defaults,
      { warnOptional: { baseCoin, category, orderFilter, settleCoin, stopOrderType } },
      { warnRequired: { symbol } },
    );

  return bybitPost(sign, ORDER_CANCEL_ALL, data)
};

export default orderCancelAll;
