/**
 * Handle Coinbase Advanced API currency all response aggregation.
 *
 * @see https://docs.cdp.coinbase.com/coinbase-app/docs/api-currencies
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/currency/all
 */

import { fileNewest } from '#lib/file_system.mjs';
import { obtainName } from '#lib/utility.mjs';
import aggregate from '../aggregate.mjs';

/**
 * @returns {RSnapshot} Aggregated file data written in the collection directory.
 */
const currencyAll = () => {
  const { config } = global.apiTools.coinbase,
    {
      PATH,
      PATH: { CURRENCY_ALL },
    } = config,
    directory = obtainName(CURRENCY_ALL, PATH).toLowerCase(),
    file = fileNewest('response/coinbase/snapshot/' + directory),
    fileAggregated = aggregate(directory, file.name);

  return fileAggregated;
};

export default currencyAll;
