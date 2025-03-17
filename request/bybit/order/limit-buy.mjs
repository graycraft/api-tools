/**
 * Handle Bybit API request, with placing limit buy order.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @typedef {import("#types/response/bybit/order/limit-buy.js").default} OrderLimitBuy
 * @module request/bybit/order/limit-buy
 */

import { orderLimitBuy as schema } from '#res/bybit/order/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} qty Base currency quantity.
 * @param {string} price Order price complying with minimum price and price precision from `MARKET_INFORMATION` endpoint.
 * @param {string} [symbol] Currency pair code (e.g. "ETHUSDC").
 * @param {{
 *   category?: string;
 *   closeOnTrigger?: string;
 *   isLeverage?: string;
 *   marketUnit?: string;
 *   mmp?: string;
 *   orderFilter?: string;
 *   orderIv?: string;
 *   orderLinkId?: string;
 *   positionIdx?: string;
 *   reduceOnly?: string;
 *   slLimitPrice?: string;
 *   slOrderType?: string;
 *   slTriggerBy?: string;
 *   smpType?: string;
 *   stopLoss?: string;
 *   takeProfit?: string;
 *   timeInForce?: string;
 *   tpLimitPrice?: string;
 *   tpOrderType?: string;
 *   tpTriggerBy?: string;
 *   tpslMode?: string;
 *   triggerBy?: string;
 *   triggerDirection?: string;
 *   triggerPrice?: string;
 * }} options Optional parameters.
 * @returns {Promise<OrderLimitBuy>} JSON data from response.
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
  const { config, settings } = global.apiTools.bybit,
    {
      COIN: { BASE, QUOTE },
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
        side: SIDE.BUY,
        symbol: BASE.NAME + QUOTE.NAME,
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
