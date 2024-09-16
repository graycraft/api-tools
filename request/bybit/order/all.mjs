/**
 * Handle Bybit API order all endpoint.
 * 
 * @module request/bybit/order/all
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/open-order
 */
const orderAll = (symbol, side, limit, {
  baseCoin, category, cursor, openOnly, orderFilter, orderId, orderLinkId, settleCoin
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { ORDER_ALL } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(ORDER_ALL, defaults,
      { warnOptional: { category } },
      { warnRequired: {
        baseCoin, category, cursor, limit, openOnly, orderFilter,
        orderLinkId, settleCoin, side, symbol
      } },
    );

  return bybitGet(sign, ORDER_ALL, data);
};

export default orderAll;
