/**
 * Handle Coinbase Advanced API market tickers endpoint.
 *
 * @module request/coinbase/market/tickers
 */

import coinbaseGet from '../get.mjs';
import isValidParams from '../validate.mjs';
import validateParams from '../../validate.mjs';

/**
 * Note: returns data in same format as `MARKET_INFORMATION` but without `products` array.
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproduct
 */
const marketTickers = (product_id, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_TICKERS },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    defaults = {
      /** @todo Formatter. */
      product_id: base + '-' + quote,
    },
    data = validateParams(
      MARKET_TICKERS,
      isValidParams,
      defaults,
      { warnOptional: { product_id } },
      { warnRequired: { limit } },
    );

  return coinbaseGet(null, MARKET_TICKERS, data);
};

export default marketTickers;
