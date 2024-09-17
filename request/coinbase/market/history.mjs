/**
 * Handle Coinbase Advanced API market history endpoint.
 *
 * @module request/coinbase/market/history
 */

import coinbaseGet from '../get.mjs';
import coinbaseValidate from '../validate.mjs';
import schema from '../../../response/coinbase/schema/market/history.mjs';
import responseValidate from '../../../response/validate.mjs';

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
    data = coinbaseValidate(
      MARKET_HISTORY,
      defaults,
      { warnOptional: { product_id } },
      { warnRequired: { limit } },
    ),
    json = await coinbaseGet(null, MARKET_HISTORY, data),
    isValidJson = responseValidate(json, schema);

  return isValidJson;
};

export default marketHistory;
