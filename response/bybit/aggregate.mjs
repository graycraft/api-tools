/**
 * Aggregate a Bybit API response snapshot, usually for extracting arrays of data.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @typedef {import("#types/common.ts").dictionary} dictionary
 * @typedef {import("#types/collection/bybit/currency_all.js").default} JCurrencyAll
 * @typedef {import("#types/collection/bybit/network_all.js").default} JNetworkAll
 * @typedef {import("#types/response/snapshot.js").default} JSnapshot
 * @module response/bybit/aggregate
 */

import { successfulJson } from '#lib/fetch.mjs';
import { fileReadJson } from '#lib/file_system.mjs';

import aggregate from '../aggregate.mjs';

/**
 * Aggregate a Bybit API response snapshot.
 * @param {string} directory Directory to take snapshot JSON from.
 * @param {string} fileName File name of snapshot file.
 * @returns {RSnapshot} File data to write in the collection directory.
 */
const bybitAggregate = (directory, fileName) => {
  const { bybit } = global.apiTools,
    endpoint = directory.toUpperCase(),
    fileData = /** @type {JSnapshot} */ (
      fileReadJson('response/bybit/snapshot/' + directory, fileName)
    ),
    json = /** @type {{}[]} */ (
      /** @type {{ result: { rows: object }}} */ (successfulJson(fileData)).result.rows
    ),
    file = aggregate(
      bybit,
      endpoint,
      json,
      {
        /**
         * Callback for mapping currencies array.
         * @param {JCurrencyAll[number]} item
         * @returns {JCurrencyAll[number]}
         */
        currencies: (item) => ({
          chains: item.chains.map((item) => ({
            chain: item.chain,
            chainType: item.chainType,
          })),
          coin: item.coin,
          name: item.name,
        }),
        networks: (row) =>
          /**
           * Callback for mapping networks array.
           * @param {JNetworkAll[number]} item
           * @returns {JNetworkAll[number]}
           */
          row.chains.map((/** @type {JNetworkAll[number]} */ item) => ({
            chain: item.chain,
            chainType: item.chainType,
          })),
        /**
         * Callback for sorting currencies or networks array.
         * @param {JCurrencyAll[number]} item1
         * @param {JCurrencyAll[number]} item2
         * @returns {number}
         */
        sort: (item1, item2) => item1['coin'].localeCompare(item2['coin']),
      },
      fileName,
    );

  return file;
};

export default bybitAggregate;
