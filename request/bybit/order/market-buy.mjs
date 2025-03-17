/**
 * Handle Bybit API request, with placing market buy order.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/create-order
 * @see https://bybit-exchange.github.io/docs/v5/smp
 * @typedef {import("#types/response/bybit/order/market-buy.js").default} JOrderMarketBuy
 * @module request/bybit/order/market-buy
 */

import { orderMarketBuy as schema } from '#res/bybit/order/schema.mjs';

import post from '../post.mjs';
import validate from '../validate.mjs';

/**
 * @param {string} qty Quote currency quantity.
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
 * @returns {Promise<JOrderMarketBuy>} JSON data from response.
 */
const orderMarketBuy = async (
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
    // price,
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
        orderType: ORDER.MARKET,
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
      throw: { qty },
    }),
    json = await post(ORDER_PLACE, schema, security, data);

  return json;
};

export default orderMarketBuy;
