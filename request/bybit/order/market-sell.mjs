/**
 * Handle Bybit API request, with placing market sell order.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @typedef {import("#types/response/bybit/order/market-sell.d.js").default} OrderMarketSell
 * @module request/bybit/order/market-sell
 */

import { orderMarketSell as schema } from '#res/bybit/order/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} qty Quote currency quantity.
 * @param {string} [symbol] Currency pair code (e.g. "ETHUSDC").
 * @param {{
 *   category?, closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerDirection?, triggerPrice?, triggerBy?
 * }} options Optional parameters.
 * @returns {Promise<OrderMarketSell>} JSON data from response.
 */
const orderMarketSell = async (
  qty,
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
        orderType: ORDER.MARKET,
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
        triggerDirection,
        triggerPrice,
        triggerBy,
      },
      throw: { qty },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderMarketSell;
