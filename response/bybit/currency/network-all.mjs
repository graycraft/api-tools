/**
 * Handle Bybit API network all response aggregation.
 *
 * @module response/bybit/network/all
 */

import aggregate from '../aggregate.mjs';
import { fileNameNewest } from '../../../lib/file_system.mjs';
import { obtainName } from '../../../lib/utility.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const currencyNetworkAll = () => {
  const { config } = global.apiTools,
    {
      PATH: { CURRENCY_NETWORK_ALL },
    } = config,
    dir = obtainName(CURRENCY_NETWORK_ALL, config.PATH).toLowerCase(),
    file = fileNameNewest('response/bybit/snapshot/' + dir);

  aggregate(CURRENCY_NETWORK_ALL, file.name);
};

export default currencyNetworkAll;
