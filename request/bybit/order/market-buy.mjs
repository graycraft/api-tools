/**
 * Handle Bybit API place order market buy endpoint.
 *
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @module request/bybit/order/market-buy
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderMarketBuy as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * `qty` is in a quote currency.
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @param {string} qty
 * @param {string} symbol
 * @param {{
 *   closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerBy?, triggerDirection?, triggerPrice?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderMarketBuy = (
  qty,
  symbol,
  {
    closeOnTrigger,
    isLeverage,
    marketUnit,
    mmp,
    orderFilter,
    orderIv,
    orderLinkId,
    positionIdx,
    /* price, */
    reduceOnly,
    slLimitPrice,
    slOrderType,
    slTriggerBy,
    smpType,
    stopLoss,
    takeProfit,
    timeInForce,
    tpLimitPrice,
    tpOrderType,
    tpTriggerBy,
    tpslMode,
    triggerBy,
    triggerDirection,
    triggerPrice,
  } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE,
    } = config,
    {
      account,
      authentication: { security },
      currency: { base, quote },
    } = settings,
    defaults = {
      category: account.category,
      orderType: ORDER.MARKET,
      side: TRADE.BUY,
      // smpType: "None",
      symbol: base + quote,
    },
    data = validate(
      ORDER_PLACE,
      defaults,
      { throwRequired: { qty } },
      { warnOptional: { symbol } },
      {
        warnRequired: {
          closeOnTrigger,
          isLeverage,
          marketUnit,
          mmp,
          orderFilter,
          orderIv,
          orderLinkId,
          positionIdx,
          reduceOnly,
          slLimitPrice,
          slOrderType,
          slTriggerBy,
          smpType,
          stopLoss,
          takeProfit,
          timeInForce,
          tpLimitPrice,
          tpOrderType,
          tpTriggerBy,
          tpslMode,
          triggerDirection,
          triggerPrice,
          triggerBy,
        },
      },
    ),
    json = post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderMarketBuy;
