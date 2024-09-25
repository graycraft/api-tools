/**
 * Handle Bybit API network all response aggregation.
 *
 * @module response/bybit/network/all
 */

import { fileNameNewest } from '#lib/file_system.mjs';
import { obtainName } from '#lib/utility.mjs';
import bybitAggregate from '../aggregate.mjs';

/**
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 */
const networkAll = () => {
  const { config } = global.apiTools,
    {
      PATH: { NETWORK_ALL },
    } = config,
    dir = obtainName(NETWORK_ALL, config.PATH).toLowerCase(),
    file = fileNameNewest('response/bybit/snapshot/' + dir);

  bybitAggregate(NETWORK_ALL, file.name);
};

export default networkAll;
