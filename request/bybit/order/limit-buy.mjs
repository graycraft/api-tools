/**
 * Bybit API order place limit endpoint.
 * 
 * @module request/bybit/order/place_limit
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { throwRequired, warnOptional } from "../../../lib/output.mjs";
import bybitPost from "../post.mjs";

const {
    CURRENCY,
    ORDER,
    PATH: {
      ORDER_PLACE
    },
    TRADE,
  } = config,
  {
    account: {
      category,
    },
    authentication: {
      sign
    },
    currency: {
      base,
      quote
    }
  } = settings;

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 */
const orderLimitBuy = (qty, price, symbol, {
  closeOnTrigger, isLeverage, marketUnit, mmp, orderFilter, orderIv, orderLinkId, positionIdx, reduceOnly,
  slLimitPrice, slOrderType, slTriggerBy, smpType, stopLoss, takeProfit, timeInForce, tpLimitPrice,
  tpOrderType, tpTriggerBy, tpslMode, triggerDirection, triggerPrice, triggerBy
} = {}) => {
  const data = {
    category,
    // closeOnTrigger,
    // isLeverage,
    // marketUnit,
    // mmp,
    // orderFilter,
    // orderIv,
    // orderLinkId,
    orderType: ORDER.LIMIT,
    // positionIdx,
    // price,
    // qty,
    // reduceOnly,
    side: TRADE.BUY,
    // slLimitPrice,
    // slOrderType
    // slTriggerBy,
    smpType: "None",
    // stopLoss,
    symbol: base + quote
    // takeProfit,
    // timeInForce,
    // tpLimitPrice,
    // tpOrderType,
    // tpTriggerBy,
    // tpslMode,
    // triggerDirection,
    // triggerPrice,
    // triggerBy,
  };

  if (Number(price))
    data.price = price
  else throwRequired(PATH, ORDER_PLACE, "price");
  if (Number(qty))
    data.qty = qty
  else throwRequired(PATH, ORDER_PLACE, "qty");
  if (symbol) {
    if (
      Object.values(CURRENCY.BASE).some(currency1 => 
        Object.values(CURRENCY.QUOTE).some(currency2 =>
          (currency1 + currency2 === symbol) && currency1 !== currency2
        )
      )
    ) {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_PLACE, "symbol", data.symbol);
  }

  return bybitPost(sign, ORDER_PLACE, data)
};

export default orderLimitBuy;
