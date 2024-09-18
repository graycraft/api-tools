/**
 * Handle Coinbase Advanced API market history endpoint.
 *
 * @module request/coinbase/market/history
 */

import get from '../get.mjs';
import verify from '../validate.mjs';
import schema from '../../../response/coinbase/market/schema.mjs';
import validate from '../../../response/validate.mjs';

/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/reference/retailbrokerageapi_getpublicmarkettrades
 */
const marketHistory = async (product_id, limit) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { MARKET_HISTORY },
    } = config,
    {
      currency: { base, quote },
    } = settings,
    defaults = {
      /** @todo Formatter. */
      product_id: base + '-' + quote,
    },
    data = verify(
      MARKET_HISTORY,
      defaults,
      { warnOptional: { product_id } },
      { warnRequired: { limit } },
    ),
    json = await get(null, MARKET_HISTORY, data),
    isValid = validate(json, schema);

  return isValid;
};

export default marketHistory;
