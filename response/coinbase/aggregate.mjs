/**
 * Aggregate a Coinbase Advanced API response snapshot, usually for extracting arrays of data.
 *
 * @typedef {import("#res/snapshot.mjs").RSnapshot} RSnapshot
 * @typedef {import("#types/collection/coinbase/currency_all.js").default} JCurrencyAll
 * @typedef {import("#types/response/snapshot.js").default} Snapshot
 * @module response/coinbase/aggregate
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
const coinbaseAggregate = (directory, fileName) => {
  const { coinbase } = global.apiTools,
    endpoint = directory.toUpperCase(),
    fileData = /** @type {Snapshot} */ (
      fileReadJson('response/coinbase/snapshot/' + directory, fileName)
    ),
    json = /** @type {{}[]} */ (/** @type {{ data: object }} */ (successfulJson(fileData)).data),
    file = aggregate(
      coinbase,
      endpoint,
      json,
      {
        /**
         * Callback for mapping currencies array.
         * @param {JCurrencyAll[number]} item
         * @returns {JCurrencyAll[number]}
         */
        currencies: (item) => ({
          asset_id: item['asset_id'],
          code: item['code'],
          name: item['name'],
        }),
        /**
         * Callback for sorting currencies or networks array.
         * @param {JCurrencyAll[number]} item1
         * @param {JCurrencyAll[number]} item2
         * @returns {number}
         */
        sort: (item1, item2) => item1['code'].localeCompare(item2['code']),
      },
      fileName,
    );

  return file;
};

export default coinbaseAggregate;
