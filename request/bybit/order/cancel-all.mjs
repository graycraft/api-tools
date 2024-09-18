/**
 * Handle Bybit API endpoint, with cancel all open orders.
 *
 * @see https://bybit-exchange.github.io/docs/v5/order/cancel-all
 * @module request/bybit/order/cancel-all
 */

import post from '../post.mjs';
import validate from '../validate.mjs';
import { orderCancelAll as schema } from '../../../response/bybit/order/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/enum#category
 * @see https://bybit-exchange.github.io/docs/v5/enum#stopordertype
 * @see https://bybit-exchange.github.io/docs/v5/enum#symbol
 * @param {string} [symbol] Symbol name.
 * @param {{ baseCoin?, category?, orderFilter?, orderLinkId?, settleCoin?, stopOrderType? }} rest
 * @returns {Promise<Object>} JSON data from response.
 */
const orderCancelAll = async (
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
    json = await post(ORDER_CANCEL_ALL, schema, security, data);

  return json;
};

export default orderCancelAll;
