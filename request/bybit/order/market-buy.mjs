/**
 * Handle Bybit API place order market buy endpoint.
 * 
 * @module request/bybit/order/market-buy
 */

import bybitPost from "../post.mjs";
import bybitValidate from "../validate.mjs";

/**
 * `qty` is in a quote currency.
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 */
const orderMarketBuy = (qty, symbol, {
  closeOnTrigger, isLeverage, marketUnit, mmp, orderFilter, orderIv, orderLinkId, positionIdx, price, reduceOnly,
  slLimitPrice, slOrderType, slTriggerBy, smpType, stopLoss, takeProfit, timeInForce, tpLimitPrice,
  tpOrderType, tpTriggerBy, tpslMode, triggerDirection, triggerPrice, triggerBy
} = {}) => {
  const { config, settings } = global.apiTools,
    { ORDER, PATH: { ORDER_PLACE }, TRADE } = config,
    {
      account,
      authentication: { sign },
      currency: { base, quote }
    } = settings,
    defaults = {
      category: account.category,
      orderType: ORDER.MARKET,
      side: TRADE.BUY,
      // smpType: "None",
      symbol: base + quote
    },
    data = bybitValidate(ORDER_PLACE, defaults,
      { throwRequired: { qty } },
      { warnOptional: { symbol } },
      { warnRequired: {
        closeOnTrigger, isLeverage, marketUnit, mmp, orderFilter, orderIv, orderLinkId, positionIdx, reduceOnly,
        slLimitPrice, slOrderType, slTriggerBy, smpType, stopLoss, takeProfit, timeInForce, tpLimitPrice,
        tpOrderType, tpTriggerBy, tpslMode, triggerDirection, triggerPrice, triggerBy
      } },
    );

  return bybitPost(sign, ORDER_PLACE, data)
};

export default orderMarketBuy;
