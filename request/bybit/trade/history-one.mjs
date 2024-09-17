/**
 * Handle Bybit API endpoint, with trade history one by order identifier.
 * 
 * @module request/bybit/trade/history-one
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 */
const tradeHistory = (orderId, {
  baseCoin, category, cursor, endTime, execType, limit, orderLinkId, side, startTime, symbol, 
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { TRADE_HISTORY_ONE } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(TRADE_HISTORY_ONE, defaults,
      { throwRequired: { orderId } },
      { warnOptional: { category } },
      { warnRequired: {
        baseCoin, category, cursor, endTime, execType, limit, orderLinkId, side,
        startTime, symbol
      } },
    );

  return bybitGet(sign, TRADE_HISTORY_ONE, data)
};

export default tradeHistory;
