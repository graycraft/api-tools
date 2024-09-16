/**
 * Bybit API order place limit endpoint.
 * 
 * @module request/bybit/order/place_limit
 */

import coinbasePost from "../post.mjs";
import isValidParams from "../validate.mjs";
import validateParams from "../../validate.mjs";

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 */
const orderMarketBuy = (qty, symbol, {} = {}) => {
  const { config, settings } = global.apiTools,
    {
      CURRENCY,
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE,
    } = config,
    {
      account: { category },
      authentication: { sign },
      currency: { base, quote }
    } = settings,
    defaults = {
      category,
      orderType: ORDER.MARKET,
      side: TRADE.BUY,
      symbol: base + quote
    },
    data = validateParams(
      ORDER_CANCEL_ALL, isValidParams, defaults,
      { throwRequired: { qty } },
      { warnOptional: { symbol } },
      { warnRequired: { marketUnit } },
    );

  /* if (marketUnit) {
    if (marketUnit)
      data.marketUnit = marketUnit
    else warnRequired(PATH, ORDER_PLACE, "marketUnit");
  }
  if (Number(qty))
    data.qty = qty
  else throwRequired(PATH, ORDER_PLACE, "qty");
  if (symbol) {
    if (
      Object.values(CURRENCY.BASE).some(currency1 => 
        Object.values(CURRENCY.QUOTE).some(currency2 => currency1 + currency2 === symbol)
      )
    ) {
      data.symbol = symbol
    } else warnOptional(PATH, ORDER_PLACE, "symbol", data.symbol);
  } */

  return coinbasePost(sign, ORDER_PLACE, data)
};

export default orderMarketBuy;
