/**
 * Handle Bybit API currency all response aggregation.
 *
 * @module response/bybit/currency/all
 */

import { fileNameNewest } from '#lib/file_system.mjs';
import { obtainName } from '#lib/utility.mjs';
import aggregate from '../aggregate.mjs';

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

  aggregate(CURRENCY_ALL, file.name);
};

export default currencyAll;
