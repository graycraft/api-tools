/**
 * Handle Bybit API endpoint, with placing market sell order.
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
 * @param {string} [symbol] Symbol name.
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
        orderType: ORDER.MARKET,
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
