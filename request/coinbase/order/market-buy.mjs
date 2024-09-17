/**
 * Handle Coinbase Advanced API order market buy endpoint.
 *
 * @module request/coinbase/order/market-buy
 */

import coinbasePost from '../post.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_postorder
 */
const orderMarketBuy = (qty, symbol, {} = {}) => {
  const { config, settings } = global.apiTools,
    {
      CURRENCY,
      ORDER,
      PATH: { ORDER_PLACE },
      TRADE,
    } = config,
    {
      account: { category },
      authentication: { sign },
      currency: { base, quote },
    } = settings,
    defaults = {
      category,
      orderType: ORDER.MARKET,
      side: TRADE.BUY,
      symbol: base + quote,
    },
    data = validateParams(
      ORDER_PLACE,
      isValidParams,
      defaults,
      { throwRequired: { qty } },
      { warnOptional: { symbol } },
    );

  return coinbasePost(sign, ORDER_PLACE, data);
};

export default orderMarketBuy;
