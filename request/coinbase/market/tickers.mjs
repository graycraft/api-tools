/**
 * Handle Coinbase Advanced API endpoint, with information about the last trades (ticks) and best bid/ask.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicmarkettrades
 * @module request/coinbase/market/tickers
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { marketTickers as schema } from '../../../response/coinbase/market/schema.mjs';

/**
 * @param {string} product_id Trading pair (e.g. "BTC-USD").
 * @param {string} [limit] Number of trades to be returned. Not required, despite what is stated in documentation.
 * @param {{ end?, start? }} rest
 * @returns {Promise<{ data: { trades: [{ trade_id: string }] } }>}
 */
const marketTickers = async (product_id, limit, { end, start } = {}) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_TICKERS },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    data = validate(MARKET_TICKERS, {
      defaults: {
        /** @todo Formatter. */
        product_id: base + '-' + quote,
      },
      optional: { product_id },
      required: { end, limit, start },
    }),
    json = await get(MARKET_TICKERS, schema, null, data);

  return json;
};

export default marketTickers;
