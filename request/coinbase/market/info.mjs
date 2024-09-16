/**
 * Coinbase Advanced API market history endpoint.
 * 
 * @module request/coinbase/market/history
 */

import coinbaseGet from "../get.mjs";
import isValidParams from "../validate.mjs";
import validateParams from "../../validate.mjs";

/**
 * Note: returns data in same format as `MARKET_TICKERS` but in `products` array.
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproducts
 */
const marketInfo = (product_ids, limit) => {
  const { config, settings } = global.apiTools,
    { PATH: { MARKET_INFORMATION } } = config,
    { currency: { base, quote } } = settings,
    defaults = {
      /** @todo Pass array ?product_ids=BTC-USDT&product_ids=ETH-USDT instead of ?product_ids=ETH-USDT%2CBTC-USDT. */
      product_ids: [base + "-" + quote/* , "BTC-USDT" */],
      product_type: "SPOT",
    },
    data = validateParams(
      MARKET_INFORMATION, isValidParams, defaults,
      { warnOptional: { product_ids } },
      { warnRequired: { limit } },
    );

  return coinbaseGet(null, MARKET_INFORMATION, data)
};

export default marketInfo;
