/**
 * Handle Bybit API endpoint, with placing limit sell order.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @typedef {import("#types/response/bybit/order/limit-sell.d.js").default} OrderLimitSell
 * @module request/bybit/order/limit-sell
 */

import { orderLimitSell as schema } from '#res/bybit/order/schema.mjs';
import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} qty Base currency quantity.
 * @param {string} price Order price complying with min price and price precision from `MARKET_INFORMATION` endpoint.
 * @param {string} [symbol] Symbol name.
 * @param {{
 *   category?, closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerBy?, triggerDirection?, triggerPrice?
 * }} options
 * @returns {Promise<OrderLimitSell>} JSON data from response.
 */
const orderLimitSell = async (
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
  const { config, prefs, settings } = global.apiTools.bybit,
    {
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE: { SIDE },
    } = config,
    {
      currency: { base, quote },
    } = prefs,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_PLACE, {
      defaults: {
        category: account.category,
        orderType: ORDER.LIMIT,
        side: SIDE.SELL,
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
        triggerBy,
        triggerDirection,
        triggerPrice,
      },
      throw: { price, qty },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderLimitSell;
