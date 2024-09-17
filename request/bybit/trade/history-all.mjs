/**
 * Handle Bybit API trade history all endpoint.
 *
 * @module request/bybit/trade/history-all
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { tradeHistoryAll as schema } from '../../../response/bybit/trade/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 * @param {string} side
 * @param {string} symbol
 * @param {string} limit
 * @param {{ baseCoin?, category?, cursor?, endTime?, execType?, orderLinkId?, startTime? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const tradeHistoryAll = (
  side,
  symbol,
  limit,
  { baseCoin, category, cursor, endTime, execType /* , orderId */, orderLinkId, startTime } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRADE_HISTORY_ALL },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      TRADE_HISTORY_ALL,
      defaults,
      { warnOptional: { category } },
      {
        warnRequired: {
          baseCoin,
          category,
          cursor,
          endTime,
          execType,
          limit,
          orderLinkId,
          side,
          startTime,
          symbol,
        },
      },
    ),
    json = get(TRADE_HISTORY_ALL, schema, security, data);

  return json;
};

export default tradeHistoryAll;
