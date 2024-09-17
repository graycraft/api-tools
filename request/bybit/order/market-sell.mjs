/**
 * Handle Bybit API place order market sell endpoint.
 *
 * @module request/bybit/order/market-sell
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderMarketSell as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * `qty` is in a base currency.
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @param {string} qty
 * @param {string} symbol
 * @param {{
 *   closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerDirection?, triggerPrice?, triggerBy?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderMarketSell = (
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
    triggerDirection,
    triggerPrice,
    triggerBy,
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
      side: TRADE.SELL,
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

export default orderMarketSell;
