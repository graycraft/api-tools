/**
 * Handle Bybit API trade history all endpoint.
 * 
 * @module request/bybit/trade/history-all
 */

import bybitGet from "../get.mjs";
import bybitValidate from "../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 */
const tradeHistory = (side, symbol, limit, {
  baseCoin, category, cursor, endTime, execType, orderId, orderLinkId, startTime
} = {}) => {
  const { config, settings } = global.apiTools,
    { PATH: { TRADE_HISTORY_ALL } } = config,
    {
      account,
      authentication: { sign },
      // currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      // symbol: base + quote,
    },
    data = bybitValidate(TRADE_HISTORY_ALL, defaults,
      { warnOptional: { category } },
      { warnRequired: {
        baseCoin, category, cursor, endTime, execType, limit, orderLinkId, side,
        startTime, symbol
      } },
    );

  return bybitGet(sign, TRADE_HISTORY_ALL, data)
};

export default tradeHistory;
