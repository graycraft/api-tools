/**
 * Handle Bybit API order one endpoint by order identifier.
 * 
 * @module request/bybit/order/one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 */
const orderOne = (orderId, {
  baseCoin, category, cursor, limit, openOnly, orderFilter, orderLinkId,
  settleCoin, side, symbol,
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_ONE } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(ORDER_ONE, defaults,
      { throwRequired: { orderId } },
      { warnOptional: { category, symbol } },
      { warnRequired: {
        baseCoin, category, cursor, limit, openOnly, orderFilter,
        orderId, orderLinkId, settleCoin, side, symbol
      } },
    );

  return bybitGet(sign, ORDER_ONE, data)
};

export default orderOne;
