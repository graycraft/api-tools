/**
 * Coinbase Advanced API endpoint, with one available currency pair (product) for trading.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicproducts
 * @module request/coinbase/market/information
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketOne as schema } from '../../../response/coinbase/market/schema.mjs';

/**
 * @param {string} product_id Trading pair (e.g. "BTC-USD").
 * @returns {Promise<{ products: [{ product_id: string }] }>}
 */
const marketOne = (product_id) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_ONE },
      PRODUCT,
    } = config,
    {
      authentication: { security },
      currency: { base, quote },
    } = settings,
    data = validate(MARKET_ONE, {
      defaults: {
        product_id: base + '-' + quote,
      },
      optional: { product_id },
    }),
    json = get(MARKET_ONE, schema, security, data);

  return json;
};

export default marketOne;
