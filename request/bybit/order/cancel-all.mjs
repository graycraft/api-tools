/**
 * Handle Bybit API order cancel all endpoint.
 *
 * @module request/bybit/order/cancel-all
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderCancelAll as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-all
 * @param {string} symbol
 * @param {{ baseCoin?, category?, orderFilter?, orderLinkId?, settleCoin?, stopOrderType? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const orderCancelAll = (
  symbol,
  { baseCoin, category, orderFilter, orderLinkId, settleCoin, stopOrderType } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { ORDER_CANCEL_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      ORDER_CANCEL_ALL,
      defaults,
      {
        warnOptional: {
          baseCoin,
          category,
          orderFilter,
          orderLinkId,
          settleCoin,
          stopOrderType,
        },
      },
      { warnRequired: { symbol } },
    ),
    json = post(ORDER_CANCEL_ALL, schema, security, data);

  return json;
};

export default orderCancelAll;
