/**
 * Handle Bybit API endpoint, with placing limit buy order.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @module request/bybit/order/limit-buy
 */

import { orderLimitBuy as schema } from '#res/bybit/order/schema.mjs';
import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#ordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#positionidx
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @see https://bybit-exchange.github.io/docs/v5/enum#timeinforce
 * @see https://bybit-exchange.github.io/docs/v5/enum#triggerby
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @param {string} qty Base currency quantity.
 * @param {string} price Order price complying with min price and price precision from `MARKET_INFORMATION` endpoint.
 * @param {string} [symbol] Symbol name.
 * @param {{
 *   category?, closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerBy?, triggerDirection?, triggerPrice?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderLimitBuy = async (
  qty,
  price,
  symbol,
  {
    category,
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
    triggerBy,
    triggerDirection,
    triggerPrice,
  } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE: { SIDE },
    } = config,
    {
      account,
      authentication: { security },
      currency: { base, quote },
    } = settings,
    data = validate(ORDER_PLACE, {
      defaults: {
        category: account.category,
        orderType: ORDER.LIMIT,
        side: SIDE.BUY,
        symbol: base + quote,
      },
      optional: { category, symbol },
      required: {
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
      throw: { price, qty },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderLimitBuy;
