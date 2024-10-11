/**
 * Handle Bybit API network all response aggregation.
 *
 * @see https://bybit-exchange.github.io/docs/v5/asset/coin-info
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/currency/network-all
 */

import { fileNewest } from '#lib/file_system.mjs';
import { obtainName } from '#lib/utility.mjs';
import aggregate from '../aggregate.mjs';

/**
 * @returns {RSnapshot} Aggregated file data written in the collection directory.
 */
const currencyNetworkAll = () => {
  const { config } = global.apiTools.bybit,
    {
      PATH,
      PATH: { CURRENCY_NETWORK_ALL },
    } = config,
    directory = obtainName(CURRENCY_NETWORK_ALL, PATH).toLowerCase(),
    file = fileNewest('response/bybit/snapshot/' + directory),
    fileAggregated = aggregate(directory, file.name);

  return fileAggregated;
};

export default currencyNetworkAll;
