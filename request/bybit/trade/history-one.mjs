/**
 * Handle Bybit API endpoint, with trade history one by order identifier.
 *
 * @module request/bybit/trade/history-one
 */

import get from '../get.mjs';
import validate from '../validate.mjs';
import { tradeHistoryOne as schema } from '../../../response/bybit/trade/schema.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/order/execution
 * @param {string} orderId
 * @param {{ baseCoin?, category?, cursor?, endTime?, execType?, limit?, orderLinkId?, side?, startTime?, symbol? }} rest
 * @returns {Promise<object>} JSON data from response.
 */
const tradeHistoryOne = (
  orderId,
  {
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
  } = {},
) => {
  const { config, settings } = global.apiTools,
    {
      PATH: { TRADE_HISTORY_ONE },
    } = config,
    {
      account,
      authentication: { security },
    } = settings,
    defaults = {
      category: account.category,
    },
    data = validate(
      TRADE_HISTORY_ONE,
      defaults,
      { throwRequired: { orderId } },
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
    json = get(TRADE_HISTORY_ONE, schema, security, data);

  return json;
};

export default tradeHistoryOne;
