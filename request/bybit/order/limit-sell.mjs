/**
 * Handle Bybit API request, with placing limit sell order.
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
 * @param {string} price Order price complying with minimum price and price precision from `MARKET_INFORMATION` endpoint.
 * @param {string} [symbol] Currency pair code (e.g. "ETHUSDC").
 * @param {{
 *   category?, closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerBy?, triggerDirection?, triggerPrice?
 * }} options Optional parameters.
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
  const { config, settings } = global.apiTools.bybit,
    {
      ASSET: { BASE, QUOTE },
      ORDER,
      ORDER: { SIDE },
      PATH: { ORDER_PLACE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    data = validate(ORDER_PLACE, {
      defaults: {
        category: account.category,
        orderType: ORDER.LIMIT,
        side: SIDE.SELL,
        symbol: BASE.CODE + QUOTE.CODE,
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
