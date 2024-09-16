/**
 * Handle Bybit API history one endpoint by order identifier.
 * 
 * @module request/bybit/order/history-one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/order-list
 */
const orderHistoryOne = (orderId, symbol, limit, {
  baseCoin, category, cursor, endTime, openOnly, orderFilter,orderLinkId,
  orderStatus, settleCoin, startTime
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_HISTORY_ONE } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(ORDER_HISTORY_ONE, defaults,
      { throwRequired: { orderId } },
      { warnOptional: { category } },
      { warnRequired: {
        baseCoin, cursor, endTime, limit, openOnly, orderFilter, orderId,
        orderLinkId, orderStatus, settleCoin, startTime, symbol
      } },
    );

  return bybitGet(sign, ORDER_HISTORY_ONE, data)
};

export default orderHistoryOne;
