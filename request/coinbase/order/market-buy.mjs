/**
 * Bybit API order place limit endpoint.
 * 
 * @module request/bybit/order/place_limit
 */

import config from "../../../configuration/bybit.json" with { type: "json" };
import settings from "../../../settings/bybit.json" with { type: "json" };
import { throwRequired, warnOptional, warnRequired } from "../../../lib/output.mjs";
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
    // account,
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
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 */
const orderMarketBuy = (qty, symbol, {} = {}) => {
  const data = {
    category,
    orderType: ORDER.MARKET,
    side: TRADE.BUY,
    symbol: base + quote
  };

  if (marketUnit/*  && account.wallet === "UNIFIED" */) {
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
  }

  return bybitPost(sign, ORDER_PLACE, data)
};

export default orderMarketBuy;
