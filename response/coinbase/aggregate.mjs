/**
 * Aggregate a Coinbase Advanced API response snapshot, usually for extracting arrays of data.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/coinbase/aggregate
 */

import { fileReadJson } from '#lib/file_system.mjs';

import aggregate from '../aggregate.mjs';

/**
 * Aggregate a Bybit API response snapshot.
 * @param {string} directory Directory to take snapshot JSON from.
 * @param {string} fileName File name of snapshot file.
 * @returns {RSnapshot} File data to write in the collection directory.
 */
const coinbaseAggregate = (directory, fileName) => {
  const { coinbase } = global.apiTools,
    endpoint = directory.toUpperCase(),
    json = fileReadJson('response/coinbase/snapshot/' + directory, fileName),
    data = json.CREATED?.json || json.OK?.json.data,
    file = aggregate(
      coinbase,
      endpoint,
      data,
      {
        currencies: (item) => ({
          asset_id: item['asset_id'],
          code: item['code'],
          name: item['name'],
        }),
        networks: (row) =>
          row.chains.map((item) => ({
            chain: item.chain,
            chainType: item.chainType,
          })),
        sort: (item1, item2) => item1['code'].localeCompare(item2['code']),
      },
      fileName,
    );

  return file;
};

export default coinbaseAggregate;
