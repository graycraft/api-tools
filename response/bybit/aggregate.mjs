/**
 * Aggregate a Bybit API response snapshot, usually for extracting arrays of data.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @module response/bybit/aggregate
 */

import { fileReadJson } from '#lib/file_system.mjs';

import responseAggregate from '../aggregate.mjs';

/**
 * Aggregate a Bybit API response snapshot.
 * @param {string} directory Directory to take snapshot JSON from.
 * @param {string} fileName File name of snapshot file.
 * @returns {RSnapshot} File data to write in the collection directory.
 */
const bybitAggregate = (directory, fileName) => {
  const { bybit } = global.apiTools,
    endpoint = directory.toUpperCase(),
    json = fileReadJson('response/bybit/snapshot/' + directory, fileName),
    data = json.CREATED?.json || json.OK?.json.result.rows,
    file = responseAggregate(
      bybit,
      endpoint,
      data,
      {
        currencies: (item) => ({
          chains: item.chains.map((item) => ({
            chain: item.chain,
            chainType: item.chainType,
          })),
          coin: item.coin,
          name: item.name,
        }),
        networks: (row) =>
          row.chains.map((item) => ({
            chain: item.chain,
            chainType: item.chainType,
          })),
        sort: (item1, item2) => item1['coin'].localeCompare(item2['coin']),
      },
      fileName,
    );

  return file;
};

export default bybitAggregate;
