/**
 * Handle Bybit API currency all response aggregation.
 *
 * @module response/bybit/currency/all
 */

import bybitAggregate from '../aggregate.mjs';
import { fileNameNewest } from '../../../lib/file_system.mjs';
import { obtainName } from '../../../lib/utility.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyAll = () => {
  const { config } = global.apiTools,
    {
      PATH: { CURRENCY_ALL },
    } = config,
    path = obtainName(CURRENCY_ALL, config.PATH).toLowerCase(),
    file = fileNameNewest('response/bybit/snapshot/' + path);

  bybitAggregate(CURRENCY_ALL, file.name);
};

export default currencyAll;
