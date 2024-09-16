/**
 * Handle Bybit API history all endpoint.
 * 
 * @module request/bybit/order/history-all
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 */
const orderHistoryAll = (symbol, limit, {
  baseCoin, category, cursor, endTime, openOnly, orderFilter, orderId, orderLinkId,
  orderStatus, settleCoin, startTime
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_HISTORY_ALL } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(ORDER_HISTORY_ALL, defaults,
      { warnOptional: { category } },
      { warnRequired: {
        baseCoin, cursor, endTime, limit, openOnly, orderFilter,
        orderLinkId, orderStatus, settleCoin, startTime, symbol
      } },
    )

  return bybitGet(sign, ORDER_HISTORY_ALL, data);
};

export default orderHistoryAll;
