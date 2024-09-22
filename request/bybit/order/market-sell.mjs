/**
 * Handle Bybit API endpoint, with placing market sell order.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @module request/bybit/order/market-sell
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderMarketSell as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#ordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#positionidx
 * @see https://bybit-exchange.github.io/docs/v5/enum#smptype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @see https://bybit-exchange.github.io/docs/v5/enum#timeinforce
 * @see https://bybit-exchange.github.io/docs/v5/enum#triggerby
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @param {string} qty Quote currency quantity.
 * @param {string} [symbol] Symbol name.
 * @param {{
 *   category?, closeOnTrigger?, isLeverage?, marketUnit?, mmp?, orderFilter?, orderIv?, orderLinkId?, positionIdx?,
 *   reduceOnly?, slLimitPrice?, slOrderType?, slTriggerBy?, smpType?, stopLoss?, takeProfit?, timeInForce?,
 *   tpLimitPrice?, tpOrderType?, tpTriggerBy?, tpslMode?, triggerDirection?, triggerPrice?, triggerBy?
 * }} rest
 * @returns {Promise<object>} JSON data from response.
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
